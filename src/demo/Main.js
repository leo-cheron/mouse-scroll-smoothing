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

		this._smoothScroll = new SmoothScroll(document.querySelector('.scrollable'));

		window.addEventListener("resize", debounce(this._onResize, 100));

		Promise.all([new FontFaceObserver('Playfair Display').load(), new FontFaceObserver('Source Sans Pro').load()]).then(() =>
		{
			if(this._smoothScroll)
				this._smoothScroll.resize();
		});
		
		this._update();
	}

	@autobind
	_update()
	{
		if(this._smoothScroll)
			this._smoothScroll.update();
		
		window.requestAnimationFrame(this._update);
	}
	
	//-----------------------------------------------------o handlers
	
	@autobind
	_onResize()
	{
		if(this._smoothScroll)
			this._smoothScroll.resize();
	}
}

new Main();