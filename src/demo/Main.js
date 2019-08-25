import SmoothScroll from "lib/SmoothScroll";
import { debounce } from "debounce";
import FontFaceObserver from "fontfaceobserver";

class Main
{
	constructor()
	{
		document.addEventListener("DOMContentLoaded", this._onDomContentLoaded);
	}

	@autobind
	_onDomContentLoaded()
	{
		document.removeEventListener("DOMContentLoaded", this._onDomContentLoaded);

		this._smoothScroll = new SmoothScroll(document.querySelector('.scrollable'), {
			easing: 0.1,
			easingFf: 0.35,
			autoResize: false,
			autoRaf: false,
			rafCallback: () => {
				//
			},
		});

		window.addEventListener("resize", debounce(this._onResize, 100));

		Promise.all([new FontFaceObserver('Playfair Display').load(), new FontFaceObserver('Source Sans Pro').load()]).then(() =>
		{
			this._smoothScroll.resize();
		});
		
		this._update();
	}

	@autobind
	_update()
	{
		this._smoothScroll.update();
		
		window.requestAnimationFrame(this._update);
	}
	
	//-----------------------------------------------------o handlers
	
	@autobind
	_onResize()
	{
		this._smoothScroll.resize();
	}
}

new Main();