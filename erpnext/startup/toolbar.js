/* toolbar settings */
wn.provide('erpnext.toolbar');

erpnext.toolbar.setup = function() {
	// profile
	$('#toolbar-user').append('<li><a href="#profile-settings">Profile Settings</a></li>');
	
	$('#toolbar-user').append('<li><a href="#My Company">Team / Messages</a></li>');

	$('.navbar .pull-right').prepend('\
		<li><a href="#" id="toolbar-new-comments"></a></li>');

	// help
	$('.navbar .pull-right').append('<li class="dropdown">\
		<a class="dropdown-toggle" data-toggle="dropdown" href="#" \
			onclick="return false;">Help<b class="caret"></b></a>\
		<ul class="dropdown-menu" id="toolbar-help">\
		</ul></li>')

	$('#toolbar-help').append('<li><a href="http://erpnext.blogspot.com/2011/03/erpnext-help.html" target="_blank">\
		Documentation</a></li>')

	$('#toolbar-help').append('<li><a href="http://groups.google.com/group/erpnext-user-forum" target="_blank">\
		Forum</a></li>')

	$('#toolbar-help').append('<li><a href="http://www.providesupport.com?messenger=iwebnotes" target="_blank">\
		Live Chat (Office Hours)</a></li>')

	// billing
	if(pscript.is_erpnext_saas && is_system_manager) {
		$('#toolbar-user').append('<li><a href="#billing">Billing</a></li>')
	}

	$.extend(page_body.wntoolbar, {
		set_new_comments: function(new_comments) {
			var navbar_nc = $('#toolbar-new-comments');
			if(new_comments && new_comments.length>0) {
				navbar_nc.html('<span class="navbar-new-comments">' + new_comments.length + '</span>');
				navbar_nc.click(function() { loadpage('My Company'); });
				$.each(new_comments, function(i, v) {
					var msg = 'New Message: ' + (v[1].length<=100 ? v[1] : (v[1].substr(0, 100) + "..."));
					var id = v[0].replace('/', '-');
					if(!$('#' + id)[0]) { show_alert(msg, id); }
				})
			} else {
				navbar_nc.html('');
				navbar_nc.click(function() { return false; });
			}
		}
	});

	page_body.wntoolbar.set_new_comments();
}

