import detectPassiveEvents from "detect-passive-events";

/**
 * Smooth scroll
 * @author Léo Chéron
 */
export default class SmoothScroll
{
	constructor(dom, options = {})
	{
		this.dom = dom;
		this.options = options;

		// physics
		this.vy = 0;
		this.percent = 0;
		this.x = 0;
		this.y = this._y = 0;
		
		const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
		this._easing = isFirefox ? 0.35 : 0.13;
		this._frictionTouchRelease = 0.95;
		this._ratio = this.options.ratio || 1;

		this._firstScroll = true;

		this._enabled = true;

		this._deltaArray = [0, 0, 0];
		this._isStopped = true;

		this._onScroll = this._onScroll.bind(this);
		this._onTouchStart = this._onTouchStart.bind(this);
		this._onMouseWheel = this._onMouseWheel.bind(this);

		this._scrollify();
	}

	resize(boundingHeight)
	{
		this.height = this.dom.getBoundingClientRect().height;
		this.boundingHeight = boundingHeight || window.innerHeight;

		this.update(true);
	}

	update(now = false)
	{
		if(this.enabled)
		{
			if(!this._dragging && (now || this._mode == 'touch' || this._mode == 'trackpad'))
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

		this.percent = this.y / (this.height - this.boundingHeight);

		if(!this.preventDomUpdate || now)
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
				this._dummy.style.display = "none";
			
			// this.dom.style.willChange = '';
		}
		else
		{
			// this.dom.style.willChange = "transform";
			
			if(this._dummy)
				this._dummy.style.display = '';

			window.scrollTo(0, this.y);

			this.resize();
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
			this._dummy.style.height = this._height + "px";
	}

	get height()
	{
		return this._height;
	}

	//-----------------------------------------------------o private

	_updateDom()
	{
		const y = ((this.y + 0.01) * 100 | 0) / 100; // rounding values

		if(y !== this._oy)
		{
			let translate = "translate3d(" + this.x + "px," + -y + "px,0)";
			this.dom.style.transform = translate;
		}
		
		this._oy = this.y;
	}

	_scrollify()
	{
		// update dom to make things work
		this.dom.style.position = "fixed";
		// this.dom.style.willChange = "transform";

		this._dummy = document.createElement("div");
		this._dummy.style.position = "absolute";
		this._dummy.style.top = 0;
		this._dummy.style.left = 0;
		this._dummy.style.width = "1px";
		this._dummy.style.visibility = "hidden";
		this.dom.parentNode.appendChild(this._dummy);

		// events
		const passive = detectPassiveEvents.hasSupport ? {passive: true} : false;

		window.addEventListener('scroll', this._onScroll, passive);

		this._wheelEvent = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
							document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
							"DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

		this.dom.addEventListener(this._wheelEvent, this._onMouseWheel, passive);
		this.dom.addEventListener('touchstart', this._onTouchStart, passive);
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

		clearTimeout(this._timer);
		this._timer = setTimeout(() => 
		{
            this._deltaArray = [0, 0, 0];
            this._isStopped = true;
		}, 150);

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
			this._y = this.thumb ? Math.round(this.thumb.percent * (this.height - this.boundingHeight)) : window.scrollY || window.pageYOffset;

			if(this._firstScroll)
			{
				this.y = this._oy = this._y;
				this.update(true);
				
				this._firstScroll = false;
			}
		}
	}
}