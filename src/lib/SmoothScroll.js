import detectPassiveEvents from "detect-passive-events";

/**
 * Smooth scrolling
 * @author Léo Chéron
 */
export default class SmoothScroll
{
	constructor(dom, options = {})
	{
		this.dom = dom;
		this.options = options;

		this.options.autoResize = this.options.autoResize != undefined ? this.options.autoResize : true;
		this.options.autoRaf = this.options.autoRaf != undefined ? this.options.autoRaf : true;

		// physics
		this.x = 0;
		this.y = this._y = 0;
		this.vy = 0;
		
		this._percent = 0;

		this._enabled = true;
		this._firstScroll = true;
		
		const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
		this._easing = isFirefox ? (this.options.easingFf || 0.35) : (this.options.easing || 0.1);

		// trackad detection
		this._deltaArray = [0, 0, 0];
		this._direction = 1;
		this._isStopped = true;

		// autobinding
		this._onScroll = this._onScroll.bind(this);
		this._onTouchStart = this._onTouchStart.bind(this);
		this._onMouseWheel = this._onMouseWheel.bind(this);
		
		this._scrollify();
		
		if(this.options.autoRaf)
		{
			this._tick = this._tick.bind(this);
			this._tick();
		}
	}

	resize(wh)
	{
		this.height = this.dom.offsetHeight;
		this.wh = wh || window.innerHeight;

		this.update(true);
	}

	update(now)
	{
		if(this.enabled)
		{
			if(now || 
			  (!this._dragging && (this._mode == 'touch' || this._mode == 'trackpad')))
			{
				this.y = this._y;
				this.vy = 0;
			}
			else
			{
				this.y += (this._y - this.y) * this._easing;
				this.vy = this._y - this.y;
			}
		}

		this._percent = this.y / (this.height - this.wh);

		if(now || !this.preventDomUpdate)
			this._updateDom();
	}

	destroy()
	{
		if(this._dummy)
			this._dummy.parentNode.removeChild(this._dummy);

		window.removeEventListener('scroll', this._onScroll);

		this.dom.removeEventListener(this._wheelEvent, this._onMouseWheel);
		this.dom.removeEventListener('touchstart', this._onTouchStart);
	}

	reset()
	{
		this._y = 0;
		this.update(true);
	}

	//-----------------------------------------------------o getters & setters

	set enabled(value)
	{
		this._enabled = value;

		if(!value)
		{
			if(this._dummy)
				this._dummy.style.display = 'none';
			
			// this.dom.style.willChange = '';
		}
		else
		{
			// this.dom.style.willChange = 'transform';
			
			if(this._dummy)
				this._dummy.style.display = '';

			window.scrollTo(0, this.y);

			this.resize(this.wh);
		}
	}

	get enabled()
	{
		return this._enabled;
	}

	set height(value)
	{
		this._height = value;

		if(this._dummy)
			this._dummy.style.height = this._height + 'px';
	}

	get height()
	{
		return this._height;
	}

	get percent()
	{
		return this._percent;
	}

	//-----------------------------------------------------o private

	_tick()
	{
		this.update();

		if(this.options.rafCallback) 
			this.options.rafCallback(this._percent);

		window.requestAnimationFrame(this._tick);
	}

	_updateDom()
	{
		const y = ((this.y + 0.01) * 100 | 0) / 100; // rounding values

		if(y !== this._oy)
		{
			let translate = `translate3d(${this.x}px,${-y}px,0)`;
			this.dom.style.transform = translate;
		}
		
		this._oy = this.y;
	}

	_scrollify()
	{
		// update dom to make things work
		this.dom.style.position = 'fixed';
		// this.dom.style.willChange = 'transform';

		this._dummy = document.createElement('div');
		this._dummy.style.position = 'absolute';
		this._dummy.style.top = 0;
		this._dummy.style.left = 0;
		this._dummy.style.width = '1px';
		this._dummy.style.height = this.dom.offsetHeight + 'px';
		this._dummy.style.visibility = 'hidden';
		this.dom.parentNode.appendChild(this._dummy);

		// events
		const passive = detectPassiveEvents.hasSupport ? {passive: true} : false;

		window.addEventListener('scroll', this._onScroll, passive);

		this._wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : // Modern browsers support 'wheel'
							document.onmousewheel !== undefined ? 'mousewheel' : // Webkit and IE support at least 'mousewheel'
							'DOMMouseScroll'; // let's assume that remaining browsers are older Firefox

		this.dom.addEventListener(this._wheelEvent, this._onMouseWheel, passive);
		this.dom.addEventListener('touchstart', this._onTouchStart, passive);

		if(this.options.autoResize)
		{
			window.addEventListener('resize', this.resize.bind(this), passive);
			this.resize();
		}
	}

	_analyzeArray(deltaY) 
	{
        const
            deltaArray0Abs  = Math.abs(this._deltaArray[0]),
            deltaArray1Abs  = Math.abs(this._deltaArray[1]),
            deltaArray2Abs  = Math.abs(this._deltaArray[2]),
			deltaAbs        = Math.abs(deltaY);
			
        if((deltaAbs > deltaArray2Abs) &&
            (deltaArray2Abs > deltaArray1Abs) &&
			(deltaArray1Abs > deltaArray0Abs)) 
		{
            this._wheelAcceleration = true;
        }
        else if((deltaAbs < deltaArray2Abs) &&
			(deltaArray2Abs <= deltaArray1Abs)) 
		{
			this._wheelAcceleration = false;
			this._mode = 'trackpad';
		}

		this._deltaArray.shift();
		this._deltaArray.push(deltaY);
    }

	//-----------------------------------------------------o handlers

	_onMouseWheel(e)
	{
		if(!this._mode || this._mode == 'touch')
			this._mode = 'mouse';

		this._dragging = false;

		const deltaY = event.wheelDelta && !event.deltaY ? -event.wheelDelta : event.deltaY;

		const direction = deltaY > 0 ? 1 : -1;
		if(direction !== this._direction)
			this._deltaArray = [0, 0, 0];
		this._direction = direction;

		clearTimeout(this._timer);
		this._timer = setTimeout(() => 
		{
            this._deltaArray = [0, 0, 0];
            this._isStopped = true;
		}, 120);

		if(this._isStopped) 
		{
			this._isStopped = false;
			if(this._wheelAcceleration) this._mode = 'mouse';
			this._wheelAcceleration = true;
		}

		this._analyzeArray(deltaY);
	}

	_onTouchStart(e)
	{
		this._dragging = false;
		this._mode = "touch";
	}

	_onScroll(e)
	{
		// user is dragging the scroll thumb
		if(this._isStopped)
			this._dragging = true;

		if(this.enabled)
		{
			this._y = window.pageYOffset;

			if(this._firstScroll)
			{
				this.y = this._oy = this._y;
				this.update(true);
				
				this._firstScroll = false;
			}
		}
	}
}