sap.ui.define(
[],

function()
{
    "use strict";
    
	return {
		
		uiBusyDuration: function()
		{
			let busyDuration = 100;
			return busyDuration;
        },
        
		uiBusyDelay: function()
		{
			let busyDelay = 10;
			return busyDelay;
        },
        
		doBusy: function(fnResolve, self, args)
		{
			let duration = this.uiBusyDuration();
			let delay = this.uiBusyDelay();
			sap.ui.core.BusyIndicator.show(delay);
			let timeout = setTimeout(function()
			{
				if (typeof fnResolve === "function")
				{
					fnResolve(self, args);
				}
				sap.ui.core.BusyIndicator.hide();
				clearTimeout(timeout);
			}, duration);
        }
	};
});