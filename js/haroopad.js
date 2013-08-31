window.ee = new EventEmitter();

var googlePickerCallback = function(res) {
	if (res.action !== google.picker.Action.PICKED) return;

	ee.emit('picked', res);
}

var createBuilder = function() {
    var builder = new google.picker.PickerBuilder().
        enableFeature(google.picker.Feature.MULTISELECT_ENABLED).
        addView(google.picker.ViewId.PHOTOS).
        addView(google.picker.ViewId.DOCS).
        addView(google.picker.ViewId.DOCS_VIDEOS).
        addView(new google.picker.PhotosView().setType('camerasync')).
        addView(google.picker.ViewId.PHOTO_UPLOAD).
        // addView(google.picker.ViewId.WEBCAM).
        addView(google.picker.ViewId.MAPS).
        addView(google.picker.ViewId.VIDEO_SEARCH);

    return builder;
}

var launchGooglePicker = function () {
    google.load('picker', '1', {
        callback: function () {
            var builder = createBuilder();
            builder.setCallback(googlePickerCallback);

            var picker = builder.build();
            picker.setVisible(true);
        }
    });
};

// $(document.body).ready(function() {
function init() {
	if (typeof window.google === 'undefined') {
		var script = document.createElement('script');
		var head = document.getElementsByTagName('head')[0];
		script.src = "http://www.google.com/jsapi";
		head.appendChild(script);
        // $('<script src="http://www.google.com/jsapi"></script>').appendTo(document.getElementsByTagName('head')[0]);
       
        var googleTimer = setInterval(function () {
            if (typeof window.google === 'undefined') return;

            clearTimeout(googleTimer);

            launchGooglePicker();
        }, 20);
    } else {
        launchGooglePicker();
    }
}