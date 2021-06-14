(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/dashboard"],{

/***/ "./resources/js/dashboard.js":
/*!***********************************!*\
  !*** ./resources/js/dashboard.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, $, jQuery) {function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

global.$ = global.jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"); // require('bootstrap/dist/js/bootstrap');

__webpack_require__(/*! ../templates/dashboard/AdminLTE/plugins/bootstrap/js/bootstrap.bundle.min.js */ "./resources/templates/dashboard/AdminLTE/plugins/bootstrap/js/bootstrap.bundle.min.js");

__webpack_require__(/*! ../templates/dashboard/AdminLTE/dist/js/adminlte */ "./resources/templates/dashboard/AdminLTE/dist/js/adminlte.js");

__webpack_require__(/*! ../templates/dashboard/AdminLTE/dist/js/demo */ "./resources/templates/dashboard/AdminLTE/dist/js/demo.js");

__webpack_require__(/*! ../templates/dashboard/AdminLTE/plugins/summernote/summernote */ "./resources/templates/dashboard/AdminLTE/plugins/summernote/summernote.js"); // require('moment/dist/moment');
// require('../templates/dashboard/AdminLTE/plugins/daterangepicker/daterangepicker');


__webpack_require__(/*! ../plugins/jQuery.filer/js/jquery.filer */ "./resources/plugins/jQuery.filer/js/jquery.filer.js");

__webpack_require__(/*! ../plugins/scorllbar/js/OverlayScrollbars.js */ "./resources/plugins/scorllbar/js/OverlayScrollbars.js");

__webpack_require__(/*! ../plugins/scorllbar/js/OverlayScrollbars.js */ "./resources/plugins/scorllbar/js/OverlayScrollbars.js"); // global.annyang = require("../plugins/annyang/annyang.min.js");


__webpack_require__(/*! lightbox2/dist/js/lightbox.min */ "./node_modules/lightbox2/dist/js/lightbox.min.js");

__webpack_require__(/*! datatables.net-dt/js/dataTables.dataTables.min */ "./node_modules/datatables.net-dt/js/dataTables.dataTables.min.js");

__webpack_require__(/*! ../plugins/Thumbnail-Generator/jquery-thumbnail-cut */ "./resources/plugins/Thumbnail-Generator/jquery-thumbnail-cut.js");

global.countapi = __webpack_require__(/*! countapi-js */ "./node_modules/countapi-js/index.js");
$(function () {
  //Add text editor
  $('.summernote').summernote({
    // height: 150,
    minHeight: 150,
    maxHeight: 600
  });
});

function createDraftElement() {
  $(this).parent().find('.for_draft').html('<input name="isDraft" value="yes">');
  $('#mail_form').submit();
}

$('#draft').on('click', createDraftElement);
$(document).ready(function () {
  $('#filer_input').filer({
    showThumbs: true,
    addMore: true,
    allowDuplicates: false
  });
});
setTimeout(function () {
  $('.alert').slideUp();
}, 4000);
$(".delete-record-form").prepend('<div class = "delete-method"></div>');
$(".btn-delete").one("click", function () {
  $(".delete-record-form").prepend('<input type="hidden" name="_method" value="delete">');
});
/* for delete action in admin  panel */

$('.delete-btn').click(function (e) {
  e.preventDefault();
  var confirmed = confirm("Are you sure you want to delete this data?");

  if (confirmed) {
    $(this).parent().find('form').submit();
  }
});
/* for deleting mails */

$('.btn-delete').on('click', function (e) {
  e.preventDefault();
  var arr = $('.delete-record-form').serialize().toString();

  if (arr.indexOf("del_record") < 0) {
    e.preventDefault();
    play("You must select atleast one mail.");
    jsError("You must select atleast one mail.");
  } else {
    if ($(this).get(0).hasAttribute("data-system_click")) {
      // if(play_status != null){
      var voiceStartCallback = function voiceStartCallback() {
        if (annyang) {
          var commands = {
            'yes *tag': function yesTag() {
              $('.delete-record-form').submit();
            }
          };
          annyang.addCommands(commands);
          annyang.start();
        }
      };
      /*            if(annyang) {
                    var commands = {
                      'yes *tag': function() {
                        var something = (function() {
                            var executed = false;
                            return function() {
                              if (!executed) {
                                  executed = true;
                                  $('.delete-record-form').submit();
                              }
                            };
                        })();
                        something();
                      }
                    };
                    annyang.addCommands(commands);
                    annyang.start();
                  }*/
      // }


      // var play_status = '';
      // play_status = play("Are you sure you want to delete ?");
      playWithParam("Are you sure you want to delete ?", {
        onstart: voiceStartCallback
      });
    } else {
      var confirmed = confirm("Are you sure you want to delete.");

      if (confirmed) {
        $('.delete-record-form').submit();
      }
    }
  }
});
/* for replying mails */

$('.btn-main-reply').on('click', function (e) {
  e.preventDefault();

  if ($('.mailbox-messages').find('input[type=checkbox]:checked').length !== 1) {
    play("You must select at least and at most one mail");
    jsError("You must select at least and at most one mail");
  } else {
    var mail_id = $('.mailbox-messages').find('input[type=checkbox]:checked').data('mail_id');
    var mail_type = $('.mailbox-messages').find('input[type=checkbox]:checked').data('mail_type');
    var route = '/mail/' + mail_id + '/' + mail_type + '/reply'; // $(this).attr('href',route);

    window.location.href = route; // $(this).click();
  }
});
/*
$(".inbox_not").on('click', function(e) {
  e.preventDefault();
  var inbox_not_id = $(this).data('inbox_not_id');
  var inbox_id = $(this).data('inbox_id');
  var route = "/mail/inbox/"+inbox_id;
  $.ajax({
    url: "/mail/inbox/"+inbox_id,
    type: "get",
    datatype: "json",
    data: {
      'inbox_not_id': inbox_not_id,
    },
    success: function(response){
      if(typeof(response) != "object"){
        response = JSON.parse(response);
      }
      if(response.status){
        // if(response.data[0]){
          $(this).attr('href',route);
          window.location.href = route;
          $(this).click();
        // }
      }
    }
  });
});*/

$('.nav_more_btn').on('click', function (e) {
  $('.to_be_toggle').toggleClass('d-none');
});
$('.btn-read-delete').on('click', function (e) {
  e.preventDefault();
  var confirmed = confirm("Are you sure you want to delete this email.");

  if (confirmed) {
    $('#delete-read-form').submit();
  }
});
/* for refreshing the page content */

$('.fa-sync-alt').on('click', function (e) {
  window.location.reload(true);
});
/* document.addEventListener("DOMContentLoaded", function() {
    OverlayScrollbars(document.querySelectorAll("body"), { });
}); */

global.scroll = function () {
  OverlayScrollbars(document.querySelectorAll("body"), {}); // OverlayScrollbars(document.getElementsByClassName("sidebar"), { });
};

scroll();
/* for playing or speakint text using google transalte api */

global.getAudio = function (txt) {
  jQuery.ajax({
    url: "/read-aloud",
    type: 'get',
    data: {
      txt: txt
    },
    success: function success(response) {
      if (_typeof(response) != "object") {
        response = JSON.parse(response);
      }

      if (response.status) {
        if (response.data) {
          $('#player').html(response.data);
        }
      }
    }
  });
};
/* for playing or speakint text using ResponsiveVoice js */


global.play = function (txt) {
  responsiveVoice.clickEvent();
  responsiveVoice.setTextReplacements([{
    searchvalue: "@gmail.com",
    newvalue: "at the rate gmail dot com"
  }]);
  responsiveVoice.setDefaultVoice("US English Female");
  responsiveVoice.speak(txt);
};

global.playWithParam = function (txt) {
  var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  responsiveVoice.clickEvent();
  responsiveVoice.setTextReplacements([{
    searchvalue: "@gmail.com",
    newvalue: "at the rate gmail dot com"
  }]);
  lang = "US English Female";

  if (parameters !== null) {
    responsiveVoice.speak(txt, lang, parameters);
  } else {
    responsiveVoice.speak(txt, lang);
  }
};
/* for displaying errors using javascript */


global.jsError = function (txt) {
  $(".js-error").html('');
  $(".js-error").css('display', 'block');
  setTimeout(function () {
    $(".js-error").slideUp();
  }, 4000);
  $(".js-error").append('<button type="button" class="close" data-dismiss="alert" ria-hidden="true">×</button>' + txt);
};
/* for converting one to 1 like upto 5 , it can be used like voice command
    "delete first mail or select first mail"
 */


global.wordToDigit = function wordToDigit(word) {
  var words = ['first', 'second', 'third', 'fourth', 'fifth'];
  var digits = [1, 2, 3, 4, 5];
  var pos = words.indexOf(word);
  return digits[pos];
};

$(function () {
  //Enable check and uncheck all functionality
  $('.checkbox-toggle').click(function () {
    var clicks = $(this).data('clicks');

    if (clicks) {
      //Uncheck all checkboxes
      $('.mailbox-messages input[type=\'checkbox\']').prop('checked', false);
      $('.checkbox-toggle .far.fa-check-square').removeClass('fa-check-square').addClass('fa-square');
    } else {
      //Check all checkboxes
      $('.mailbox-messages input[type=\'checkbox\']').prop('checked', true);
      $('.checkbox-toggle .far.fa-square').removeClass('fa-square').addClass('fa-check-square');
    }

    $(this).data('clicks', !clicks);
  }); //Handle starring for font awesome

  $('.mailbox-star').click(function (e) {
    e.preventDefault(); //detect type

    var $this = $(this).find('a > i');
    var fa = $this.hasClass('fa'); //Switch states

    if (fa) {
      $this.toggleClass('fa-star');
      $this.toggleClass('fa-star-o');
    }
  });
});
/* for printing specific page of content. it used for printing email */

global.printContent = function printContent(el) {
  printDiv = "." + el; // id of the div you want to print

  $("*").addClass("no-print");
  $(printDiv + " *").removeClass("no-print");
  $(printDiv).removeClass("no-print");
  parent = $(printDiv).parent();

  while ($(parent).length) {
    $(parent).removeClass("no-print");
    parent = $(parent).parent();
  }

  window.print();
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"), __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/plugins/Thumbnail-Generator/jquery-thumbnail-cut.js":
/*!***********************************************************************!*\
  !*** ./resources/plugins/Thumbnail-Generator/jquery-thumbnail-cut.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {$(function () {
  $('.thumb > img').each(function () {
    p_width = $(this).parent().width();
    p_height = $(this).parent().height();
    n_width = $(this).get(0).naturalWidth;
    n_height = $(this).get(0).naturalHeight;
    p_aspect = p_width / p_height;
    n_aspcet = n_width / n_height;
    $(this).css({
      'position': 'relative'
    });
    $(this).parent().css('overflow', 'hidden');

    if (n_aspcet < p_aspect) {
      $(this).width(p_width);
      $(this).height("auto");
      $(this).css({
        'bottom': (p_width / n_aspcet - p_height) / 2
      });
    } else {
      $(this).width("auto");
      $(this).height(p_height);
      $(this).css({
        'right': (p_height * n_aspcet - p_width) / 2
      });
    }
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/plugins/jQuery.filer/js/jquery.filer.js":
/*!***********************************************************!*\
  !*** ./resources/plugins/jQuery.filer/js/jquery.filer.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * jQuery.filer
 * Copyright (c) 2016 CreativeDream
 * Website: https://github.com/CreativeDream/jquery.filer
 * Version: 1.3 (14-Sep-2016)
 * Requires: jQuery v1.7.1 or later
 */
(function ($) {
  "use strict";

  $.fn.filer = function (q) {
    return this.each(function (t, r) {
      var s = $(r),
          b = '.jFiler',
          p = $(),
          o = $(),
          l = $(),
          sl = [],
          n_f = $.isFunction(q) ? q(s, $.fn.filer.defaults) : q,
          n = n_f && $.isPlainObject(n_f) ? $.extend(true, {}, $.fn.filer.defaults, n_f) : $.fn.filer.defaults,
          f = {
        init: function init() {
          s.wrap('<div class="jFiler"></div>');

          f._set('props');

          s.prop("jFiler").boxEl = p = s.closest(b);

          f._changeInput();
        },
        _bindInput: function _bindInput() {
          if (n.changeInput && o.length > 0) {
            o.on("click", f._clickHandler);
          }

          s.on({
            "focus": function focus() {
              o.addClass('focused');
            },
            "blur": function blur() {
              o.removeClass('focused');
            },
            "change": f._onChange
          });

          if (n.dragDrop) {
            n.dragDrop.dragContainer.on("drag dragstart dragend dragover dragenter dragleave drop", function (e) {
              e.preventDefault();
              e.stopPropagation();
            });
            n.dragDrop.dragContainer.on("drop", f._dragDrop.drop);
            n.dragDrop.dragContainer.on("dragover", f._dragDrop.dragEnter);
            n.dragDrop.dragContainer.on("dragleave", f._dragDrop.dragLeave);
          }

          if (n.uploadFile && n.clipBoardPaste) {
            $(window).on("paste", f._clipboardPaste);
          }
        },
        _unbindInput: function _unbindInput(all) {
          if (n.changeInput && o.length > 0) {
            o.off("click", f._clickHandler);
          }

          if (all) {
            s.off("change", f._onChange);

            if (n.dragDrop) {
              n.dragDrop.dragContainer.off("drop", f._dragDrop.drop);
              n.dragDrop.dragContainer.off("dragover", f._dragDrop.dragEnter);
              n.dragDrop.dragContainer.off("dragleave", f._dragDrop.dragLeave);
            }

            if (n.uploadFile && n.clipBoardPaste) {
              $(window).off("paste", f._clipboardPaste);
            }
          }
        },
        _clickHandler: function _clickHandler() {
          if (!n.uploadFile && n.addMore && s.val().length != 0) {
            f._unbindInput(true);

            var elem = $('<input type="file" />');
            var attributes = s.prop("attributes");
            $.each(attributes, function () {
              if (this.name == "required") return;
              elem.attr(this.name, this.value);
            });
            s.after(elem);
            sl.push(elem);
            s = elem;

            f._bindInput();

            f._set('props');
          }

          s.click();
        },
        _applyAttrSettings: function _applyAttrSettings() {
          var d = ["name", "limit", "maxSize", "fileMaxSize", "extensions", "changeInput", "showThumbs", "appendTo", "theme", "addMore", "excludeName", "files", "uploadUrl", "uploadData", "options"];

          for (var k in d) {
            var j = "data-jfiler-" + d[k];

            if (f._assets.hasAttr(j)) {
              switch (d[k]) {
                case "changeInput":
                case "showThumbs":
                case "addMore":
                  n[d[k]] = ["true", "false"].indexOf(s.attr(j)) > -1 ? s.attr(j) == "true" : s.attr(j);
                  break;

                case "extensions":
                  n[d[k]] = s.attr(j).replace(/ /g, '').split(",");
                  break;

                case "uploadUrl":
                  if (n.uploadFile) n.uploadFile.url = s.attr(j);
                  break;

                case "uploadData":
                  if (n.uploadFile) n.uploadFile.data = JSON.parse(s.attr(j));
                  break;

                case "files":
                case "options":
                  n[d[k]] = JSON.parse(s.attr(j));
                  break;

                default:
                  n[d[k]] = s.attr(j);
              }

              s.removeAttr(j);
            }
          }
        },
        _changeInput: function _changeInput() {
          f._applyAttrSettings();

          n.beforeRender != null && typeof n.beforeRender == "function" ? n.beforeRender(p, s) : null;

          if (n.theme) {
            p.addClass('jFiler-theme-' + n.theme);
          }

          if (s.get(0).tagName.toLowerCase() != "input" && s.get(0).type != "file") {
            o = s;
            s = $("<input type=\"file\" name=\"" + n.name + "\" />");
            s.css({
              position: "absolute",
              left: "-9999px",
              top: "-9999px",
              "z-index": "-9999"
            });
            p.prepend(s);
            f._isGn = s;
          } else {
            if (n.changeInput) {
              switch (_typeof(n.changeInput)) {
                case "boolean":
                  o = $('<div class="jFiler-input"><div class="jFiler-input-caption"><span>' + n.captions.feedback + '</span></div><div class="jFiler-input-button">' + n.captions.button + '</div></div>"');
                  break;

                case "string":
                case "object":
                  o = $(n.changeInput);
                  break;

                case "function":
                  o = $(n.changeInput(p, s, n));
                  break;
              }

              s.after(o);
              s.css({
                position: "absolute",
                left: "-9999px",
                top: "-9999px",
                "z-index": "-9999"
              });
            }
          }

          s.prop("jFiler").newInputEl = o;

          if (n.dragDrop) {
            n.dragDrop.dragContainer = n.dragDrop.dragContainer ? $(n.dragDrop.dragContainer) : o;
          }

          if (!n.limit || n.limit && n.limit >= 2) {
            s.attr("multiple", "multiple");
            s.attr("name").slice(-2) != "[]" ? s.attr("name", s.attr("name") + "[]") : null;
          }

          if (!s.attr("disabled") && !n.disabled) {
            n.disabled = false;

            f._bindInput();

            p.removeClass("jFiler-disabled");
          } else {
            n.disabled = true;

            f._unbindInput(true);

            p.addClass("jFiler-disabled");
          }

          if (n.files) {
            f._append(false, {
              files: n.files
            });
          }

          n.afterRender != null && typeof n.afterRender == "function" ? n.afterRender(l, p, o, s) : null;
        },
        _clear: function _clear() {
          f.files = null;
          s.prop("jFiler").files = null;

          if (!n.uploadFile && !n.addMore) {
            f._reset();
          }

          f._set('feedback', f._itFl && f._itFl.length > 0 ? f._itFl.length + ' ' + n.captions.feedback2 : n.captions.feedback);

          n.onEmpty != null && typeof n.onEmpty == "function" ? n.onEmpty(p, o, s) : null;
        },
        _reset: function _reset(a) {
          if (!a) {
            if (!n.uploadFile && n.addMore) {
              for (var i = 0; i < sl.length; i++) {
                sl[i].remove();
              }

              sl = [];

              f._unbindInput(true);

              if (f._isGn) {
                s = f._isGn;
              } else {
                s = $(r);
              }

              f._bindInput();
            }

            f._set('input', '');
          }

          f._itFl = [];
          f._itFc = null;
          f._ajFc = 0;

          f._set('props');

          s.prop("jFiler").files_list = f._itFl;
          s.prop("jFiler").current_file = f._itFc;
          f._itFr = [];
          p.find("input[name^='jfiler-items-exclude-']:hidden").remove();
          l.fadeOut("fast", function () {
            $(this).remove();
          });
          s.prop("jFiler").listEl = l = $();
        },
        _set: function _set(element, value) {
          switch (element) {
            case 'input':
              s.val(value);
              break;

            case 'feedback':
              if (o.length > 0) {
                o.find('.jFiler-input-caption span').html(value);
              }

              break;

            case 'props':
              if (!s.prop("jFiler")) {
                s.prop("jFiler", {
                  options: n,
                  listEl: l,
                  boxEl: p,
                  newInputEl: o,
                  inputEl: s,
                  files: f.files,
                  files_list: f._itFl,
                  current_file: f._itFc,
                  append: function append(data) {
                    return f._append(false, {
                      files: [data]
                    });
                  },
                  enable: function enable() {
                    if (!n.disabled) return;
                    n.disabled = false;
                    s.removeAttr("disabled");
                    p.removeClass("jFiler-disabled");

                    f._bindInput();
                  },
                  disable: function disable() {
                    if (n.disabled) return;
                    n.disabled = true;
                    p.addClass("jFiler-disabled");

                    f._unbindInput(true);
                  },
                  remove: function remove(id) {
                    f._remove(null, {
                      binded: true,
                      data: {
                        id: id
                      }
                    });

                    return true;
                  },
                  reset: function reset() {
                    f._reset();

                    f._clear();

                    return true;
                  },
                  retry: function retry(data) {
                    return f._retryUpload(data);
                  }
                });
              }

          }
        },
        _filesCheck: function _filesCheck() {
          var s = 0;

          if (n.limit && f.files.length + f._itFl.length > n.limit) {
            n.dialogs.alert(f._assets.textParse(n.captions.errors.filesLimit));
            return false;
          }

          for (var t = 0; t < f.files.length; t++) {
            var file = f.files[t],
                x = file.name.split(".").pop().toLowerCase(),
                m = {
              name: file.name,
              size: file.size,
              size2: f._assets.bytesToSize(file.size),
              type: file.type,
              ext: x
            };

            if (n.extensions != null && $.inArray(x, n.extensions) == -1 && $.inArray(m.type, n.extensions) == -1) {
              n.dialogs.alert(f._assets.textParse(n.captions.errors.filesType, m));
              return false;
            }

            if (n.maxSize != null && f.files[t].size > n.maxSize * 1048576 || n.fileMaxSize != null && f.files[t].size > n.fileMaxSize * 1048576) {
              n.dialogs.alert(f._assets.textParse(n.captions.errors.filesSize, m));
              return false;
            }

            if (file.size == 4096 && file.type.length == 0) {
              n.dialogs.alert(f._assets.textParse(n.captions.errors.folderUpload, m));
              return false;
            }

            if (n.onFileCheck != null && typeof n.onFileCheck == "function" ? n.onFileCheck(m, n, f._assets.textParse) === false : null) {
              return false;
            }

            if ((n.uploadFile || n.addMore) && !n.allowDuplicates) {
              var m = f._itFl.filter(function (a, b) {
                if (a.file.name == file.name && a.file.size == file.size && a.file.type == file.type && (file.lastModified ? a.file.lastModified == file.lastModified : true)) {
                  return true;
                }
              });

              if (m.length > 0) {
                if (f.files.length == 1) {
                  return false;
                } else {
                  file._pendRemove = true;
                }
              }
            }

            s += f.files[t].size;
          }

          if (n.maxSize != null && s >= Math.round(n.maxSize * 1048576)) {
            n.dialogs.alert(f._assets.textParse(n.captions.errors.filesSizeAll));
            return false;
          }

          return true;
        },
        _thumbCreator: {
          create: function create(i) {
            var file = f.files[i],
                id = f._itFc ? f._itFc.id : i,
                name = file.name,
                size = file.size,
                url = file.file,
                type = file.type ? file.type.split("/", 1) : "".toString().toLowerCase(),
                ext = name.indexOf(".") != -1 ? name.split(".").pop().toLowerCase() : "",
                progressBar = n.uploadFile ? '<div class="jFiler-jProgressBar">' + n.templates.progressBar + '</div>' : '',
                opts = {
              id: id,
              name: name,
              size: size,
              size2: f._assets.bytesToSize(size),
              url: url,
              type: type,
              extension: ext,
              icon: f._assets.getIcon(ext, type),
              icon2: f._thumbCreator.generateIcon({
                type: type,
                extension: ext
              }),
              image: '<div class="jFiler-item-thumb-image fi-loading"></div>',
              progressBar: progressBar,
              _appended: file._appended
            },
                html = "";

            if (file.opts) {
              opts = $.extend({}, file.opts, opts);
            }

            html = $(f._thumbCreator.renderContent(opts)).attr("data-jfiler-index", id);
            html.get(0).jfiler_id = id;

            f._thumbCreator.renderFile(file, html, opts);

            if (file.forList) {
              return html;
            }

            f._itFc.html = html;
            html.hide()[n.templates.itemAppendToEnd ? "appendTo" : "prependTo"](l.find(n.templates._selectors.list)).show();

            if (!file._appended) {
              f._onSelect(i);
            }
          },
          renderContent: function renderContent(opts) {
            return f._assets.textParse(opts._appended ? n.templates.itemAppend : n.templates.item, opts);
          },
          renderFile: function renderFile(file, html, opts) {
            if (html.find('.jFiler-item-thumb-image').length == 0) {
              return false;
            }

            if (file.file && opts.type == "image") {
              var g = '<img src="' + file.file + '" draggable="false" />',
                  m = html.find('.jFiler-item-thumb-image.fi-loading');
              $(g).error(function () {
                g = f._thumbCreator.generateIcon(opts);
                html.addClass('jFiler-no-thumbnail');
                m.removeClass('fi-loading').html(g);
              }).load(function () {
                m.removeClass('fi-loading').html(g);
              });
              return true;
            }

            if (window.File && window.FileList && window.FileReader && opts.type == "image" && opts.size < 1e+7) {
              var y = new FileReader();

              y.onload = function (e) {
                var m = html.find('.jFiler-item-thumb-image.fi-loading');

                if (n.templates.canvasImage) {
                  var canvas = document.createElement('canvas'),
                      context = canvas.getContext('2d'),
                      img = new Image();

                  img.onload = function () {
                    var height = m.height(),
                        width = m.width(),
                        heightRatio = img.height / height,
                        widthRatio = img.width / width,
                        optimalRatio = heightRatio < widthRatio ? heightRatio : widthRatio,
                        optimalHeight = img.height / optimalRatio,
                        optimalWidth = img.width / optimalRatio,
                        steps = Math.ceil(Math.log(img.width / optimalWidth) / Math.log(2));
                    canvas.height = height;
                    canvas.width = width;

                    if (img.width < canvas.width || img.height < canvas.height || steps <= 1) {
                      var x = img.width < canvas.width ? canvas.width / 2 - img.width / 2 : img.width > canvas.width ? -(img.width - canvas.width) / 2 : 0,
                          y = img.height < canvas.height ? canvas.height / 2 - img.height / 2 : 0;
                      context.drawImage(img, x, y, img.width, img.height);
                    } else {
                      var oc = document.createElement('canvas'),
                          octx = oc.getContext('2d');
                      oc.width = img.width * 0.5;
                      oc.height = img.height * 0.5;
                      octx.fillStyle = "#fff";
                      octx.fillRect(0, 0, oc.width, oc.height);
                      octx.drawImage(img, 0, 0, oc.width, oc.height);
                      octx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5);
                      context.drawImage(oc, optimalWidth > canvas.width ? optimalWidth - canvas.width : 0, 0, oc.width * 0.5, oc.height * 0.5, 0, 0, optimalWidth, optimalHeight);
                    }

                    m.removeClass('fi-loading').html('<img src="' + canvas.toDataURL("image/png") + '" draggable="false" />');
                  };

                  img.onerror = function () {
                    html.addClass('jFiler-no-thumbnail');
                    m.removeClass('fi-loading').html(f._thumbCreator.generateIcon(opts));
                  };

                  img.src = e.target.result;
                } else {
                  m.removeClass('fi-loading').html('<img src="' + e.target.result + '" draggable="false" />');
                }
              };

              y.readAsDataURL(file);
            } else {
              var g = f._thumbCreator.generateIcon(opts),
                  m = html.find('.jFiler-item-thumb-image.fi-loading');

              html.addClass('jFiler-no-thumbnail');
              m.removeClass('fi-loading').html(g);
            }
          },
          generateIcon: function generateIcon(obj) {
            var m = new Array(3);

            if (obj && obj.type && obj.type[0] && obj.extension) {
              switch (obj.type[0]) {
                case "image":
                  m[0] = "f-image";
                  m[1] = "<i class=\"icon-jfi-file-image\"></i>";
                  break;

                case "video":
                  m[0] = "f-video";
                  m[1] = "<i class=\"icon-jfi-file-video\"></i>";
                  break;

                case "audio":
                  m[0] = "f-audio";
                  m[1] = "<i class=\"icon-jfi-file-audio\"></i>";
                  break;

                default:
                  m[0] = "f-file f-file-ext-" + obj.extension;
                  m[1] = obj.extension.length > 0 ? "." + obj.extension : "";
                  m[2] = 1;
              }
            } else {
              m[0] = "f-file";
              m[1] = obj.extension && obj.extension.length > 0 ? "." + obj.extension : "";
              m[2] = 1;
            }

            var el = '<span class="jFiler-icon-file ' + m[0] + '">' + m[1] + '</span>';

            if (m[2] == 1) {
              var c = f._assets.text2Color(obj.extension);

              if (c) {
                var j = $(el).appendTo("body");
                j.css('background-color', f._assets.text2Color(obj.extension));
                el = j.prop('outerHTML');
                j.remove();
              }
            }

            return el;
          },
          _box: function _box(params) {
            if (n.beforeShow != null && typeof n.beforeShow == "function" ? !n.beforeShow(f.files, l, p, o, s) : false) {
              return false;
            }

            if (l.length < 1) {
              if (n.appendTo) {
                var appendTo = $(n.appendTo);
              } else {
                var appendTo = p;
              }

              appendTo.find('.jFiler-items').remove();
              l = $('<div class="jFiler-items jFiler-row"></div>');
              s.prop("jFiler").listEl = l;
              l.append(f._assets.textParse(n.templates.box)).appendTo(appendTo);
              l.on('click', n.templates._selectors.remove, function (e) {
                e.preventDefault();

                var m = [params ? params.remove.event : e, params ? params.remove.el : $(this).closest(n.templates._selectors.item)],
                    c = function c(a) {
                  f._remove(m[0], m[1]);
                };

                if (n.templates.removeConfirmation) {
                  n.dialogs.confirm(n.captions.removeConfirmation, c);
                } else {
                  c();
                }
              });
            }

            for (var i = 0; i < f.files.length; i++) {
              if (!f.files[i]._appended) f.files[i]._choosed = true;

              f._addToMemory(i);

              f._thumbCreator.create(i);
            }
          }
        },
        _upload: function _upload(i) {
          var c = f._itFl[i],
              el = c.html,
              formData = new FormData();
          formData.append(s.attr('name'), c.file, c.file.name ? c.file.name : false);

          if (n.uploadFile.data != null && $.isPlainObject(typeof n.uploadFile.data == "function" ? n.uploadFile.data(c.file) : n.uploadFile.data)) {
            for (var k in n.uploadFile.data) {
              formData.append(k, n.uploadFile.data[k]);
            }
          }

          f._ajax.send(el, formData, c);
        },
        _ajax: {
          send: function send(el, formData, c) {
            c.ajax = $.ajax({
              url: n.uploadFile.url,
              data: formData,
              type: n.uploadFile.type,
              enctype: n.uploadFile.enctype,
              xhr: function xhr() {
                var myXhr = $.ajaxSettings.xhr();

                if (myXhr.upload) {
                  myXhr.upload.addEventListener("progress", function (e) {
                    f._ajax.progressHandling(e, el);
                  }, false);
                }

                return myXhr;
              },
              complete: function complete(jqXHR, textStatus) {
                c.ajax = false;
                f._ajFc++;

                if (n.uploadFile.synchron && c.id + 1 < f._itFl.length) {
                  f._upload(c.id + 1);
                }

                if (f._ajFc >= f.files.length) {
                  f._ajFc = 0;
                  s.get(0).value = "";
                  n.uploadFile.onComplete != null && typeof n.uploadFile.onComplete == "function" ? n.uploadFile.onComplete(l, p, o, s, jqXHR, textStatus) : null;
                }
              },
              beforeSend: function beforeSend(jqXHR, settings) {
                return n.uploadFile.beforeSend != null && typeof n.uploadFile.beforeSend == "function" ? n.uploadFile.beforeSend(el, l, p, o, s, c.id, jqXHR, settings) : true;
              },
              success: function success(data, textStatus, jqXHR) {
                c.uploaded = true;
                n.uploadFile.success != null && typeof n.uploadFile.success == "function" ? n.uploadFile.success(data, el, l, p, o, s, c.id, textStatus, jqXHR) : null;
              },
              error: function error(jqXHR, textStatus, errorThrown) {
                c.uploaded = false;
                n.uploadFile.error != null && typeof n.uploadFile.error == "function" ? n.uploadFile.error(el, l, p, o, s, c.id, jqXHR, textStatus, errorThrown) : null;
              },
              statusCode: n.uploadFile.statusCode,
              cache: false,
              contentType: false,
              processData: false
            });
            return c.ajax;
          },
          progressHandling: function progressHandling(e, el) {
            if (e.lengthComputable) {
              var t = Math.round(e.loaded * 100 / e.total).toString();
              n.uploadFile.onProgress != null && typeof n.uploadFile.onProgress == "function" ? n.uploadFile.onProgress(t, el, l, p, o, s) : null;
              el.find('.jFiler-jProgressBar').find(n.templates._selectors.progressBar).css("width", t + "%");
            }
          }
        },
        _dragDrop: {
          dragEnter: function dragEnter(e) {
            clearTimeout(f._dragDrop._drt);
            n.dragDrop.dragContainer.addClass('dragged');

            f._set('feedback', n.captions.drop);

            n.dragDrop.dragEnter != null && typeof n.dragDrop.dragEnter == "function" ? n.dragDrop.dragEnter(e, o, s, p) : null;
          },
          dragLeave: function dragLeave(e) {
            clearTimeout(f._dragDrop._drt);
            f._dragDrop._drt = setTimeout(function (e) {
              if (!f._dragDrop._dragLeaveCheck(e)) {
                f._dragDrop.dragLeave(e);

                return false;
              }

              n.dragDrop.dragContainer.removeClass('dragged');

              f._set('feedback', n.captions.feedback);

              n.dragDrop.dragLeave != null && typeof n.dragDrop.dragLeave == "function" ? n.dragDrop.dragLeave(e, o, s, p) : null;
            }, 100, e);
          },
          drop: function drop(e) {
            clearTimeout(f._dragDrop._drt);
            n.dragDrop.dragContainer.removeClass('dragged');

            f._set('feedback', n.captions.feedback);

            if (e && e.originalEvent && e.originalEvent.dataTransfer && e.originalEvent.dataTransfer.files && e.originalEvent.dataTransfer.files.length > 0) {
              f._onChange(e, e.originalEvent.dataTransfer.files);
            }

            n.dragDrop.drop != null && typeof n.dragDrop.drop == "function" ? n.dragDrop.drop(e.originalEvent.dataTransfer.files, e, o, s, p) : null;
          },
          _dragLeaveCheck: function _dragLeaveCheck(e) {
            var related = $(e.currentTarget),
                insideEls = 0;

            if (!related.is(o)) {
              insideEls = o.find(related).length;

              if (insideEls > 0) {
                debugger;
                return false;
              }
            }

            return true;
          }
        },
        _clipboardPaste: function _clipboardPaste(e, fromDrop) {
          if (!fromDrop && !e.originalEvent.clipboardData && !e.originalEvent.clipboardData.items) {
            return;
          }

          if (fromDrop && !e.originalEvent.dataTransfer && !e.originalEvent.dataTransfer.items) {
            return;
          }

          if (f._clPsePre) {
            return;
          }

          var items = fromDrop ? e.originalEvent.dataTransfer.items : e.originalEvent.clipboardData.items,
              b64toBlob = function b64toBlob(b64Data, contentType, sliceSize) {
            contentType = contentType || '';
            sliceSize = sliceSize || 512;
            var byteCharacters = atob(b64Data);
            var byteArrays = [];

            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
              var slice = byteCharacters.slice(offset, offset + sliceSize);
              var byteNumbers = new Array(slice.length);

              for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
              }

              var byteArray = new Uint8Array(byteNumbers);
              byteArrays.push(byteArray);
            }

            var blob = new Blob(byteArrays, {
              type: contentType
            });
            return blob;
          };

          if (items) {
            for (var i = 0; i < items.length; i++) {
              if (items[i].type.indexOf("image") !== -1 || items[i].type.indexOf("text/uri-list") !== -1) {
                if (fromDrop) {
                  try {
                    window.atob(e.originalEvent.dataTransfer.getData("text/uri-list").toString().split(',')[1]);
                  } catch (e) {
                    return;
                  }
                }

                var blob = fromDrop ? b64toBlob(e.originalEvent.dataTransfer.getData("text/uri-list").toString().split(',')[1], "image/png") : items[i].getAsFile();
                blob.name = Math.random().toString(36).substring(5);
                blob.name += blob.type.indexOf("/") != -1 ? "." + blob.type.split("/")[1].toString().toLowerCase() : ".png";

                f._onChange(e, [blob]);

                f._clPsePre = setTimeout(function () {
                  delete f._clPsePre;
                }, 1000);
              }
            }
          }
        },
        _onSelect: function _onSelect(i) {
          if (n.uploadFile && !$.isEmptyObject(n.uploadFile)) {
            if (!n.uploadFile.synchron || n.uploadFile.synchron && $.grep(f._itFl, function (a) {
              return a.ajax;
            }).length == 0) {
              f._upload(f._itFc.id);
            }
          }

          if (f.files[i]._pendRemove) {
            f._itFc.html.hide();

            f._remove(null, {
              binded: true,
              data: {
                id: f._itFc.id
              }
            });
          }

          n.onSelect != null && typeof n.onSelect == "function" ? n.onSelect(f.files[i], f._itFc.html, l, p, o, s) : null;

          if (i + 1 >= f.files.length) {
            n.afterShow != null && typeof n.afterShow == "function" ? n.afterShow(l, p, o, s) : null;
          }
        },
        _onChange: function _onChange(e, d) {
          if (!d) {
            if (!s.get(0).files || typeof s.get(0).files == "undefined" || s.get(0).files.length == 0) {
              if (!n.uploadFile && !n.addMore) {
                f._set('input', '');

                f._clear();
              }

              return false;
            }

            f.files = s.get(0).files;
          } else {
            if (!d || d.length == 0) {
              f._set('input', '');

              f._clear();

              return false;
            }

            f.files = d;
          }

          if (!n.uploadFile && !n.addMore) {
            f._reset(true);
          }

          s.prop("jFiler").files = f.files;

          if (!f._filesCheck() || (n.beforeSelect != null && typeof n.beforeSelect == "function" ? !n.beforeSelect(f.files, l, p, o, s) : false)) {
            f._set('input', '');

            f._clear();

            if (n.addMore && sl.length > 0) {
              f._unbindInput(true);

              sl[sl.length - 1].remove();
              sl.splice(sl.length - 1, 1);
              s = sl.length > 0 ? sl[sl.length - 1] : $(r);

              f._bindInput();
            }

            return false;
          }

          f._set('feedback', f.files.length + f._itFl.length + ' ' + n.captions.feedback2);

          if (n.showThumbs) {
            f._thumbCreator._box();
          } else {
            for (var i = 0; i < f.files.length; i++) {
              f.files[i]._choosed = true;

              f._addToMemory(i);

              f._onSelect(i);
            }
          }
        },
        _append: function _append(e, data) {
          var files = !data ? false : data.files;

          if (!files || files.length <= 0) {
            return;
          }

          f.files = files;
          s.prop("jFiler").files = f.files;

          if (n.showThumbs) {
            for (var i = 0; i < f.files.length; i++) {
              f.files[i]._appended = true;
            }

            f._thumbCreator._box();
          }
        },
        _getList: function _getList(e, data) {
          var files = !data ? false : data.files;

          if (!files || files.length <= 0) {
            return;
          }

          f.files = files;
          s.prop("jFiler").files = f.files;

          if (n.showThumbs) {
            var returnData = [];

            for (var i = 0; i < f.files.length; i++) {
              f.files[i].forList = true;
              returnData.push(f._thumbCreator.create(i));
            }

            if (data.callback) {
              data.callback(returnData, l, p, o, s);
            }
          }
        },
        _retryUpload: function _retryUpload(e, data) {
          var id = parseInt(_typeof(data) == "object" ? data.attr("data-jfiler-index") : data),
              obj = f._itFl.filter(function (value, key) {
            return value.id == id;
          });

          if (obj.length > 0) {
            if (n.uploadFile && !$.isEmptyObject(n.uploadFile) && !obj[0].uploaded) {
              f._itFc = obj[0];
              s.prop("jFiler").current_file = f._itFc;

              f._upload(id);

              return true;
            }
          } else {
            return false;
          }
        },
        _remove: function _remove(e, el) {
          if (el.binded) {
            if (typeof el.data.id != "undefined") {
              el = l.find(n.templates._selectors.item + "[data-jfiler-index='" + el.data.id + "']");

              if (el.length == 0) {
                return false;
              }
            }

            if (el.data.el) {
              el = el.data.el;
            }
          }

          var excl_input = function excl_input(val) {
            var input = p.find("input[name^='jfiler-items-exclude-']:hidden").first();

            if (input.length == 0) {
              input = $('<input type="hidden" name="jfiler-items-exclude-' + (n.excludeName ? n.excludeName : (s.attr("name").slice(-2) != "[]" ? s.attr("name") : s.attr("name").substring(0, s.attr("name").length - 2)) + "-" + t) + '">');
              input.appendTo(p);
            }

            if (val && $.isArray(val)) {
              val = JSON.stringify(val);
              input.val(val);
            }
          },
              callback = function callback(el, id) {
            var item = f._itFl[id],
                val = [];

            if (item.file._choosed || item.file._appended || item.uploaded) {
              f._itFr.push(item);

              var m = f._itFl.filter(function (a) {
                return a.file.name == item.file.name;
              });

              for (var i = 0; i < f._itFr.length; i++) {
                if (n.addMore && f._itFr[i] == item && m.length > 0) {
                  f._itFr[i].remove_name = m.indexOf(item) + "://" + f._itFr[i].file.name;
                }

                val.push(f._itFr[i].remove_name ? f._itFr[i].remove_name : f._itFr[i].file.name);
              }
            }

            excl_input(val);

            f._itFl.splice(id, 1);

            if (f._itFl.length < 1) {
              f._reset();

              f._clear();
            } else {
              f._set('feedback', f._itFl.length + ' ' + n.captions.feedback2);
            }

            el.fadeOut("fast", function () {
              $(this).remove();
            });
          };

          var attrId = el.get(0).jfiler_id || el.attr('data-jfiler-index'),
              id = null;

          for (var key in f._itFl) {
            if (key === 'length' || !f._itFl.hasOwnProperty(key)) continue;

            if (f._itFl[key].id == attrId) {
              id = key;
            }
          }

          if (!f._itFl.hasOwnProperty(id)) {
            return false;
          }

          if (f._itFl[id].ajax) {
            f._itFl[id].ajax.abort();

            callback(el, id);
            return;
          }

          if (n.onRemove != null && typeof n.onRemove == "function" ? n.onRemove(el, f._itFl[id].file, id, l, p, o, s) !== false : true) {
            callback(el, id);
          }
        },
        _addToMemory: function _addToMemory(i) {
          f._itFl.push({
            id: f._itFl.length,
            file: f.files[i],
            html: $(),
            ajax: false,
            uploaded: false
          });

          if (n.addMore || f.files[i]._appended) f._itFl[f._itFl.length - 1].input = s;
          f._itFc = f._itFl[f._itFl.length - 1];
          s.prop("jFiler").files_list = f._itFl;
          s.prop("jFiler").current_file = f._itFc;
        },
        _assets: {
          bytesToSize: function bytesToSize(bytes) {
            if (bytes == 0) return '0 Byte';
            var k = 1000;
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            var i = Math.floor(Math.log(bytes) / Math.log(k));
            return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
          },
          hasAttr: function hasAttr(attr, el) {
            var el = !el ? s : el,
                a = el.attr(attr);

            if (!a || typeof a == "undefined") {
              return false;
            } else {
              return true;
            }
          },
          getIcon: function getIcon(ext, type) {
            var types = ["audio", "image", "text", "video"];

            if ($.inArray(type, types) > -1) {
              return '<i class="icon-jfi-file-' + type + ' jfi-file-ext-' + ext + '"></i>';
            }

            return '<i class="icon-jfi-file-o jfi-file-type-' + type + ' jfi-file-ext-' + ext + '"></i>';
          },
          textParse: function textParse(text, opts) {
            opts = $.extend({}, {
              limit: n.limit,
              maxSize: n.maxSize,
              fileMaxSize: n.fileMaxSize,
              extensions: n.extensions ? n.extensions.join(',') : null
            }, opts && $.isPlainObject(opts) ? opts : {}, n.options);

            switch (_typeof(text)) {
              case "string":
                return text.replace(/\{\{fi-(.*?)\}\}/g, function (match, a) {
                  a = a.replace(/ /g, '');

                  if (a.match(/(.*?)\|limitTo\:(\d+)/)) {
                    return a.replace(/(.*?)\|limitTo\:(\d+)/, function (match, a, b) {
                      var a = opts[a] ? opts[a] : "",
                          str = a.substring(0, b);
                      str = a.length > str.length ? str.substring(0, str.length - 3) + "..." : str;
                      return str;
                    });
                  } else {
                    return opts[a] ? opts[a] : "";
                  }
                });
                break;

              case "function":
                return text(opts);
                break;

              default:
                return text;
            }
          },
          text2Color: function text2Color(str) {
            if (!str || str.length == 0) {
              return false;
            }

            for (var i = 0, hash = 0; i < str.length; hash = str.charCodeAt(i++) + ((hash << 5) - hash)) {
              ;
            }

            for (var i = 0, colour = "#"; i < 3; colour += ("00" + (hash >> i++ * 2 & 0xFF).toString(16)).slice(-2)) {
              ;
            }

            return colour;
          }
        },
        files: null,
        _itFl: [],
        _itFc: null,
        _itFr: [],
        _itPl: [],
        _ajFc: 0
      };
      s.on("filer.append", function (e, data) {
        f._append(e, data);
      }).on("filer.remove", function (e, data) {
        data.binded = true;

        f._remove(e, data);
      }).on("filer.reset", function (e) {
        f._reset();

        f._clear();

        return true;
      }).on("filer.generateList", function (e, data) {
        return f._getList(e, data);
      }).on("filer.retry", function (e, data) {
        return f._retryUpload(e, data);
      });
      f.init();
      return this;
    });
  };

  $.fn.filer.defaults = {
    limit: null,
    maxSize: 32,
    fileMaxSize: 32,
    extensions: null,
    changeInput: true,
    showThumbs: false,
    appendTo: null,
    theme: 'default',
    templates: {
      box: '<ul class="jFiler-items-list jFiler-items-grid"></ul>',
      item: '<li class="jFiler-item">\
						<div class="jFiler-item-container">\
							<div class="jFiler-item-inner">\
								<div class="jFiler-item-thumb">\
									<div class="jFiler-item-status"></div>\
									<div class="jFiler-item-thumb-overlay">\
										<div class="jFiler-item-info">\
											<div style="display:table-cell;vertical-align: middle;">\
												<span class="jFiler-item-title"><b title="{{fi-name}}">{{fi-name}}</b></span>\
												<span class="jFiler-item-others">{{fi-size2}}</span>\
											</div>\
										</div>\
									</div>\
									{{fi-image}}\
								</div>\
								<div class="jFiler-item-assets jFiler-row">\
									<ul class="list-inline pull-left">\
										<li>{{fi-progressBar}}</li>\
									</ul>\
									<ul class="list-inline pull-right">\
										<li><a class="icon-jfi-trash jFiler-item-trash-action"></a></li>\
									</ul>\
								</div>\
							</div>\
						</div>\
					</li>',
      itemAppend: '<li class="jFiler-item">\
							<div class="jFiler-item-container">\
								<div class="jFiler-item-inner">\
									<div class="jFiler-item-thumb">\
										<div class="jFiler-item-status"></div>\
										<div class="jFiler-item-thumb-overlay">\
											<div class="jFiler-item-info">\
												<div style="display:table-cell;vertical-align: middle;">\
													<span class="jFiler-item-title"><b title="{{fi-name}}">{{fi-name}}</b></span>\
													<span class="jFiler-item-others">{{fi-size2}}</span>\
												</div>\
											</div>\
										</div>\
										{{fi-image}}\
									</div>\
									<div class="jFiler-item-assets jFiler-row">\
										<ul class="list-inline pull-left">\
											<li><span class="jFiler-item-others">{{fi-icon}}</span></li>\
										</ul>\
										<ul class="list-inline pull-right">\
											<li><a class="icon-jfi-trash jFiler-item-trash-action"></a></li>\
										</ul>\
									</div>\
								</div>\
							</div>\
						</li>',
      progressBar: '<div class="bar"></div>',
      itemAppendToEnd: false,
      canvasImage: true,
      removeConfirmation: true,
      _selectors: {
        list: '.jFiler-items-list',
        item: '.jFiler-item',
        progressBar: '.bar',
        remove: '.jFiler-item-trash-action'
      }
    },
    files: null,
    uploadFile: null,
    dragDrop: null,
    addMore: false,
    allowDuplicates: false,
    clipBoardPaste: true,
    excludeName: null,
    beforeRender: null,
    afterRender: null,
    beforeShow: null,
    beforeSelect: null,
    onSelect: null,
    onFileCheck: null,
    afterShow: null,
    onRemove: null,
    onEmpty: null,
    options: null,
    dialogs: {
      alert: function alert(text) {
        getAudio(text);
        $(".compose-file-error").html('');
        $(".compose-file-error").css('display', 'block');
        setTimeout(function () {
          $(".compose-file-error").slideUp();
        }, 3000);
        $(".compose-file-error").append('<button type="button" class="close" data-dismiss="alert" ria-hidden="true">×</button>' + text); // return alert(text);
      },
      confirm: function (_confirm) {
        function confirm(_x, _x2) {
          return _confirm.apply(this, arguments);
        }

        confirm.toString = function () {
          return _confirm.toString();
        };

        return confirm;
      }(function (text, callback) {
        confirm(text) ? callback() : null;
      })
    },
    captions: {
      button: "<i class='fas fa-paperclip'></i> Attachment",
      feedback: "Browse Files",
      feedback2: "files were chosen",
      drop: "Drop file here to Upload",
      removeConfirmation: "Are you sure you want to remove this file?",
      errors: {
        filesLimit: "Only {{fi-limit}} files are allowed to be uploaded.",
        filesType: "Only Images are allowed to be uploaded.",
        // filesSize: "{{fi-name}} is too large! Please upload file up to {{fi-fileMaxSize}} MB.",
        filesSize: "This file is too large.Please upload file up to {{fi-fileMaxSize}} MB.",
        filesSizeAll: "Files you've choosed are too large! Please upload files up to {{fi-maxSize}} MB.",
        folderUpload: "You are not allowed to upload folders."
      }
    }
  };
})(jQuery);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/templates/dashboard/AdminLTE/dist/js/adminlte.js":
/*!********************************************************************!*\
  !*** ./resources/templates/dashboard/AdminLTE/dist/js/adminlte.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * AdminLTE v3.1.0-pre (https://adminlte.io)
 * Copyright 2014-2020 Colorlib <https://colorlib.com>
 * Licensed under MIT (https://github.com/ColorlibHQ/AdminLTE/blob/master/LICENSE)
 */
(function (global, factory) {
  ( false ? undefined : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : (undefined);
})(this, function (exports, $) {
  'use strict';

  function _interopDefaultLegacy(e) {
    return e && _typeof(e) === 'object' && 'default' in e ? e : {
      'default': e
    };
  }

  var $__default = /*#__PURE__*/_interopDefaultLegacy($);
  /**
   * --------------------------------------------
   * AdminLTE CardRefresh.js
   * License MIT
   * --------------------------------------------
   */

  /**
   * Constants
   * ====================================================
   */


  var NAME = 'CardRefresh';
  var DATA_KEY = 'lte.cardrefresh';
  var EVENT_KEY = "." + DATA_KEY;
  var JQUERY_NO_CONFLICT = $__default['default'].fn[NAME];
  var EVENT_LOADED = "loaded" + EVENT_KEY;
  var EVENT_OVERLAY_ADDED = "overlay.added" + EVENT_KEY;
  var EVENT_OVERLAY_REMOVED = "overlay.removed" + EVENT_KEY;
  var CLASS_NAME_CARD = 'card';
  var SELECTOR_CARD = "." + CLASS_NAME_CARD;
  var SELECTOR_DATA_REFRESH = '[data-card-widget="card-refresh"]';
  var Default = {
    source: '',
    sourceSelector: '',
    params: {},
    trigger: SELECTOR_DATA_REFRESH,
    content: '.card-body',
    loadInContent: true,
    loadOnInit: true,
    responseType: '',
    overlayTemplate: '<div class="overlay"><i class="fas fa-2x fa-sync-alt fa-spin"></i></div>',
    onLoadStart: function onLoadStart() {},
    onLoadDone: function onLoadDone(response) {
      return response;
    }
  };

  var CardRefresh = /*#__PURE__*/function () {
    function CardRefresh(element, settings) {
      this._element = element;
      this._parent = element.parents(SELECTOR_CARD).first();
      this._settings = $__default['default'].extend({}, Default, settings);
      this._overlay = $__default['default'](this._settings.overlayTemplate);

      if (element.hasClass(CLASS_NAME_CARD)) {
        this._parent = element;
      }

      if (this._settings.source === '') {
        throw new Error('Source url was not defined. Please specify a url in your CardRefresh source option.');
      }
    }

    var _proto = CardRefresh.prototype;

    _proto.load = function load() {
      var _this = this;

      this._addOverlay();

      this._settings.onLoadStart.call($__default['default'](this));

      $__default['default'].get(this._settings.source, this._settings.params, function (response) {
        if (_this._settings.loadInContent) {
          if (_this._settings.sourceSelector !== '') {
            response = $__default['default'](response).find(_this._settings.sourceSelector).html();
          }

          _this._parent.find(_this._settings.content).html(response);
        }

        _this._settings.onLoadDone.call($__default['default'](_this), response);

        _this._removeOverlay();
      }, this._settings.responseType !== '' && this._settings.responseType);
      $__default['default'](this._element).trigger($__default['default'].Event(EVENT_LOADED));
    };

    _proto._addOverlay = function _addOverlay() {
      this._parent.append(this._overlay);

      $__default['default'](this._element).trigger($__default['default'].Event(EVENT_OVERLAY_ADDED));
    };

    _proto._removeOverlay = function _removeOverlay() {
      this._parent.find(this._overlay).remove();

      $__default['default'](this._element).trigger($__default['default'].Event(EVENT_OVERLAY_REMOVED));
    } // Private
    ;

    _proto._init = function _init() {
      var _this2 = this;

      $__default['default'](this).find(this._settings.trigger).on('click', function () {
        _this2.load();
      });

      if (this._settings.loadOnInit) {
        this.load();
      }
    } // Static
    ;

    CardRefresh._jQueryInterface = function _jQueryInterface(config) {
      var data = $__default['default'](this).data(DATA_KEY);

      var _options = $__default['default'].extend({}, Default, $__default['default'](this).data());

      if (!data) {
        data = new CardRefresh($__default['default'](this), _options);
        $__default['default'](this).data(DATA_KEY, typeof config === 'string' ? data : config);
      }

      if (typeof config === 'string' && config.match(/load/)) {
        data[config]();
      } else {
        data._init($__default['default'](this));
      }
    };

    return CardRefresh;
  }();
  /**
   * Data API
   * ====================================================
   */


  $__default['default'](document).on('click', SELECTOR_DATA_REFRESH, function (event) {
    if (event) {
      event.preventDefault();
    }

    CardRefresh._jQueryInterface.call($__default['default'](this), 'load');
  });
  $__default['default'](function () {
    $__default['default'](SELECTOR_DATA_REFRESH).each(function () {
      CardRefresh._jQueryInterface.call($__default['default'](this));
    });
  });
  /**
   * jQuery API
   * ====================================================
   */

  $__default['default'].fn[NAME] = CardRefresh._jQueryInterface;
  $__default['default'].fn[NAME].Constructor = CardRefresh;

  $__default['default'].fn[NAME].noConflict = function () {
    $__default['default'].fn[NAME] = JQUERY_NO_CONFLICT;
    return CardRefresh._jQueryInterface;
  };
  /**
   * --------------------------------------------
   * AdminLTE CardWidget.js
   * License MIT
   * --------------------------------------------
   */

  /**
   * Constants
   * ====================================================
   */


  var NAME$1 = 'CardWidget';
  var DATA_KEY$1 = 'lte.cardwidget';
  var EVENT_KEY$1 = "." + DATA_KEY$1;
  var JQUERY_NO_CONFLICT$1 = $__default['default'].fn[NAME$1];
  var EVENT_EXPANDED = "expanded" + EVENT_KEY$1;
  var EVENT_COLLAPSED = "collapsed" + EVENT_KEY$1;
  var EVENT_MAXIMIZED = "maximized" + EVENT_KEY$1;
  var EVENT_MINIMIZED = "minimized" + EVENT_KEY$1;
  var EVENT_REMOVED = "removed" + EVENT_KEY$1;
  var CLASS_NAME_CARD$1 = 'card';
  var CLASS_NAME_COLLAPSED = 'collapsed-card';
  var CLASS_NAME_COLLAPSING = 'collapsing-card';
  var CLASS_NAME_EXPANDING = 'expanding-card';
  var CLASS_NAME_WAS_COLLAPSED = 'was-collapsed';
  var CLASS_NAME_MAXIMIZED = 'maximized-card';
  var SELECTOR_DATA_REMOVE = '[data-card-widget="remove"]';
  var SELECTOR_DATA_COLLAPSE = '[data-card-widget="collapse"]';
  var SELECTOR_DATA_MAXIMIZE = '[data-card-widget="maximize"]';
  var SELECTOR_CARD$1 = "." + CLASS_NAME_CARD$1;
  var SELECTOR_CARD_HEADER = '.card-header';
  var SELECTOR_CARD_BODY = '.card-body';
  var SELECTOR_CARD_FOOTER = '.card-footer';
  var Default$1 = {
    animationSpeed: 'normal',
    collapseTrigger: SELECTOR_DATA_COLLAPSE,
    removeTrigger: SELECTOR_DATA_REMOVE,
    maximizeTrigger: SELECTOR_DATA_MAXIMIZE,
    collapseIcon: 'fa-minus',
    expandIcon: 'fa-plus',
    maximizeIcon: 'fa-expand',
    minimizeIcon: 'fa-compress'
  };

  var CardWidget = /*#__PURE__*/function () {
    function CardWidget(element, settings) {
      this._element = element;
      this._parent = element.parents(SELECTOR_CARD$1).first();

      if (element.hasClass(CLASS_NAME_CARD$1)) {
        this._parent = element;
      }

      this._settings = $__default['default'].extend({}, Default$1, settings);
    }

    var _proto = CardWidget.prototype;

    _proto.collapse = function collapse() {
      var _this = this;

      this._parent.addClass(CLASS_NAME_COLLAPSING).children(SELECTOR_CARD_BODY + ", " + SELECTOR_CARD_FOOTER).slideUp(this._settings.animationSpeed, function () {
        _this._parent.addClass(CLASS_NAME_COLLAPSED).removeClass(CLASS_NAME_COLLAPSING);
      });

      this._parent.find("> " + SELECTOR_CARD_HEADER + " " + this._settings.collapseTrigger + " ." + this._settings.collapseIcon).addClass(this._settings.expandIcon).removeClass(this._settings.collapseIcon);

      this._element.trigger($__default['default'].Event(EVENT_COLLAPSED), this._parent);
    };

    _proto.expand = function expand() {
      var _this2 = this;

      this._parent.addClass(CLASS_NAME_EXPANDING).children(SELECTOR_CARD_BODY + ", " + SELECTOR_CARD_FOOTER).slideDown(this._settings.animationSpeed, function () {
        _this2._parent.removeClass(CLASS_NAME_COLLAPSED).removeClass(CLASS_NAME_EXPANDING);
      });

      this._parent.find("> " + SELECTOR_CARD_HEADER + " " + this._settings.collapseTrigger + " ." + this._settings.expandIcon).addClass(this._settings.collapseIcon).removeClass(this._settings.expandIcon);

      this._element.trigger($__default['default'].Event(EVENT_EXPANDED), this._parent);
    };

    _proto.remove = function remove() {
      this._parent.slideUp();

      this._element.trigger($__default['default'].Event(EVENT_REMOVED), this._parent);
    };

    _proto.toggle = function toggle() {
      if (this._parent.hasClass(CLASS_NAME_COLLAPSED)) {
        this.expand();
        return;
      }

      this.collapse();
    };

    _proto.maximize = function maximize() {
      this._parent.find(this._settings.maximizeTrigger + " ." + this._settings.maximizeIcon).addClass(this._settings.minimizeIcon).removeClass(this._settings.maximizeIcon);

      this._parent.css({
        height: this._parent.height(),
        width: this._parent.width(),
        transition: 'all .15s'
      }).delay(150).queue(function () {
        var $element = $__default['default'](this);
        $element.addClass(CLASS_NAME_MAXIMIZED);
        $__default['default']('html').addClass(CLASS_NAME_MAXIMIZED);

        if ($element.hasClass(CLASS_NAME_COLLAPSED)) {
          $element.addClass(CLASS_NAME_WAS_COLLAPSED);
        }

        $element.dequeue();
      });

      this._element.trigger($__default['default'].Event(EVENT_MAXIMIZED), this._parent);
    };

    _proto.minimize = function minimize() {
      this._parent.find(this._settings.maximizeTrigger + " ." + this._settings.minimizeIcon).addClass(this._settings.maximizeIcon).removeClass(this._settings.minimizeIcon);

      this._parent.css('cssText', "height: " + this._parent[0].style.height + " !important; width: " + this._parent[0].style.width + " !important; transition: all .15s;").delay(10).queue(function () {
        var $element = $__default['default'](this);
        $element.removeClass(CLASS_NAME_MAXIMIZED);
        $__default['default']('html').removeClass(CLASS_NAME_MAXIMIZED);
        $element.css({
          height: 'inherit',
          width: 'inherit'
        });

        if ($element.hasClass(CLASS_NAME_WAS_COLLAPSED)) {
          $element.removeClass(CLASS_NAME_WAS_COLLAPSED);
        }

        $element.dequeue();
      });

      this._element.trigger($__default['default'].Event(EVENT_MINIMIZED), this._parent);
    };

    _proto.toggleMaximize = function toggleMaximize() {
      if (this._parent.hasClass(CLASS_NAME_MAXIMIZED)) {
        this.minimize();
        return;
      }

      this.maximize();
    } // Private
    ;

    _proto._init = function _init(card) {
      var _this3 = this;

      this._parent = card;
      $__default['default'](this).find(this._settings.collapseTrigger).click(function () {
        _this3.toggle();
      });
      $__default['default'](this).find(this._settings.maximizeTrigger).click(function () {
        _this3.toggleMaximize();
      });
      $__default['default'](this).find(this._settings.removeTrigger).click(function () {
        _this3.remove();
      });
    } // Static
    ;

    CardWidget._jQueryInterface = function _jQueryInterface(config) {
      var data = $__default['default'](this).data(DATA_KEY$1);

      var _options = $__default['default'].extend({}, Default$1, $__default['default'](this).data());

      if (!data) {
        data = new CardWidget($__default['default'](this), _options);
        $__default['default'](this).data(DATA_KEY$1, typeof config === 'string' ? data : config);
      }

      if (typeof config === 'string' && config.match(/collapse|expand|remove|toggle|maximize|minimize|toggleMaximize/)) {
        data[config]();
      } else if (_typeof(config) === 'object') {
        data._init($__default['default'](this));
      }
    };

    return CardWidget;
  }();
  /**
   * Data API
   * ====================================================
   */


  $__default['default'](document).on('click', SELECTOR_DATA_COLLAPSE, function (event) {
    if (event) {
      event.preventDefault();
    }

    CardWidget._jQueryInterface.call($__default['default'](this), 'toggle');
  });
  $__default['default'](document).on('click', SELECTOR_DATA_REMOVE, function (event) {
    if (event) {
      event.preventDefault();
    }

    CardWidget._jQueryInterface.call($__default['default'](this), 'remove');
  });
  $__default['default'](document).on('click', SELECTOR_DATA_MAXIMIZE, function (event) {
    if (event) {
      event.preventDefault();
    }

    CardWidget._jQueryInterface.call($__default['default'](this), 'toggleMaximize');
  });
  /**
   * jQuery API
   * ====================================================
   */

  $__default['default'].fn[NAME$1] = CardWidget._jQueryInterface;
  $__default['default'].fn[NAME$1].Constructor = CardWidget;

  $__default['default'].fn[NAME$1].noConflict = function () {
    $__default['default'].fn[NAME$1] = JQUERY_NO_CONFLICT$1;
    return CardWidget._jQueryInterface;
  };
  /**
   * --------------------------------------------
   * AdminLTE ControlSidebar.js
   * License MIT
   * --------------------------------------------
   */

  /**
   * Constants
   * ====================================================
   */


  var NAME$2 = 'ControlSidebar';
  var DATA_KEY$2 = 'lte.controlsidebar';
  var EVENT_KEY$2 = "." + DATA_KEY$2;
  var JQUERY_NO_CONFLICT$2 = $__default['default'].fn[NAME$2];
  var EVENT_COLLAPSED$1 = "collapsed" + EVENT_KEY$2;
  var EVENT_EXPANDED$1 = "expanded" + EVENT_KEY$2;
  var SELECTOR_CONTROL_SIDEBAR = '.control-sidebar';
  var SELECTOR_CONTROL_SIDEBAR_CONTENT = '.control-sidebar-content';
  var SELECTOR_DATA_TOGGLE = '[data-widget="control-sidebar"]';
  var SELECTOR_HEADER = '.main-header';
  var SELECTOR_FOOTER = '.main-footer';
  var CLASS_NAME_CONTROL_SIDEBAR_ANIMATE = 'control-sidebar-animate';
  var CLASS_NAME_CONTROL_SIDEBAR_OPEN = 'control-sidebar-open';
  var CLASS_NAME_CONTROL_SIDEBAR_SLIDE = 'control-sidebar-slide-open';
  var CLASS_NAME_LAYOUT_FIXED = 'layout-fixed';
  var CLASS_NAME_NAVBAR_FIXED = 'layout-navbar-fixed';
  var CLASS_NAME_NAVBAR_SM_FIXED = 'layout-sm-navbar-fixed';
  var CLASS_NAME_NAVBAR_MD_FIXED = 'layout-md-navbar-fixed';
  var CLASS_NAME_NAVBAR_LG_FIXED = 'layout-lg-navbar-fixed';
  var CLASS_NAME_NAVBAR_XL_FIXED = 'layout-xl-navbar-fixed';
  var CLASS_NAME_FOOTER_FIXED = 'layout-footer-fixed';
  var CLASS_NAME_FOOTER_SM_FIXED = 'layout-sm-footer-fixed';
  var CLASS_NAME_FOOTER_MD_FIXED = 'layout-md-footer-fixed';
  var CLASS_NAME_FOOTER_LG_FIXED = 'layout-lg-footer-fixed';
  var CLASS_NAME_FOOTER_XL_FIXED = 'layout-xl-footer-fixed';
  var Default$2 = {
    controlsidebarSlide: true,
    scrollbarTheme: 'os-theme-light',
    scrollbarAutoHide: 'l'
  };
  /**
   * Class Definition
   * ====================================================
   */

  var ControlSidebar = /*#__PURE__*/function () {
    function ControlSidebar(element, config) {
      this._element = element;
      this._config = config;

      this._init();
    } // Public


    var _proto = ControlSidebar.prototype;

    _proto.collapse = function collapse() {
      var $body = $__default['default']('body');
      var $html = $__default['default']('html'); // Show the control sidebar

      if (this._config.controlsidebarSlide) {
        $html.addClass(CLASS_NAME_CONTROL_SIDEBAR_ANIMATE);
        $body.removeClass(CLASS_NAME_CONTROL_SIDEBAR_SLIDE).delay(300).queue(function () {
          $__default['default'](SELECTOR_CONTROL_SIDEBAR).hide();
          $html.removeClass(CLASS_NAME_CONTROL_SIDEBAR_ANIMATE);
          $__default['default'](this).dequeue();
        });
      } else {
        $body.removeClass(CLASS_NAME_CONTROL_SIDEBAR_OPEN);
      }

      $__default['default'](this._element).trigger($__default['default'].Event(EVENT_COLLAPSED$1));
    };

    _proto.show = function show() {
      var $body = $__default['default']('body');
      var $html = $__default['default']('html'); // Collapse the control sidebar

      if (this._config.controlsidebarSlide) {
        $html.addClass(CLASS_NAME_CONTROL_SIDEBAR_ANIMATE);
        $__default['default'](SELECTOR_CONTROL_SIDEBAR).show().delay(10).queue(function () {
          $body.addClass(CLASS_NAME_CONTROL_SIDEBAR_SLIDE).delay(300).queue(function () {
            $html.removeClass(CLASS_NAME_CONTROL_SIDEBAR_ANIMATE);
            $__default['default'](this).dequeue();
          });
          $__default['default'](this).dequeue();
        });
      } else {
        $body.addClass(CLASS_NAME_CONTROL_SIDEBAR_OPEN);
      }

      this._fixHeight();

      this._fixScrollHeight();

      $__default['default'](this._element).trigger($__default['default'].Event(EVENT_EXPANDED$1));
    };

    _proto.toggle = function toggle() {
      var $body = $__default['default']('body');
      var shouldClose = $body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_OPEN) || $body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_SLIDE);

      if (shouldClose) {
        // Close the control sidebar
        this.collapse();
      } else {
        // Open the control sidebar
        this.show();
      }
    } // Private
    ;

    _proto._init = function _init() {
      var _this = this;

      this._fixHeight();

      this._fixScrollHeight();

      $__default['default'](window).resize(function () {
        _this._fixHeight();

        _this._fixScrollHeight();
      });
      $__default['default'](window).scroll(function () {
        var $body = $__default['default']('body');
        var shouldFixHeight = $body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_OPEN) || $body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_SLIDE);

        if (shouldFixHeight) {
          _this._fixScrollHeight();
        }
      });
    };

    _proto._fixScrollHeight = function _fixScrollHeight() {
      var $body = $__default['default']('body');

      if (!$body.hasClass(CLASS_NAME_LAYOUT_FIXED)) {
        return;
      }

      var heights = {
        scroll: $__default['default'](document).height(),
        window: $__default['default'](window).height(),
        header: $__default['default'](SELECTOR_HEADER).outerHeight(),
        footer: $__default['default'](SELECTOR_FOOTER).outerHeight()
      };
      var positions = {
        bottom: Math.abs(heights.window + $__default['default'](window).scrollTop() - heights.scroll),
        top: $__default['default'](window).scrollTop()
      };
      var navbarFixed = ($body.hasClass(CLASS_NAME_NAVBAR_FIXED) || $body.hasClass(CLASS_NAME_NAVBAR_SM_FIXED) || $body.hasClass(CLASS_NAME_NAVBAR_MD_FIXED) || $body.hasClass(CLASS_NAME_NAVBAR_LG_FIXED) || $body.hasClass(CLASS_NAME_NAVBAR_XL_FIXED)) && $__default['default'](SELECTOR_HEADER).css('position') === 'fixed';
      var footerFixed = ($body.hasClass(CLASS_NAME_FOOTER_FIXED) || $body.hasClass(CLASS_NAME_FOOTER_SM_FIXED) || $body.hasClass(CLASS_NAME_FOOTER_MD_FIXED) || $body.hasClass(CLASS_NAME_FOOTER_LG_FIXED) || $body.hasClass(CLASS_NAME_FOOTER_XL_FIXED)) && $__default['default'](SELECTOR_FOOTER).css('position') === 'fixed';
      var $controlSidebar = $__default['default'](SELECTOR_CONTROL_SIDEBAR);
      var $controlsidebarContent = $__default['default'](SELECTOR_CONTROL_SIDEBAR + ", " + SELECTOR_CONTROL_SIDEBAR + " " + SELECTOR_CONTROL_SIDEBAR_CONTENT);

      if (positions.top === 0 && positions.bottom === 0) {
        $controlSidebar.css({
          bottom: heights.footer,
          top: heights.header
        });
        $controlsidebarContent.css('height', heights.window - (heights.header + heights.footer));
      } else if (positions.bottom <= heights.footer) {
        if (footerFixed === false) {
          var top = heights.header - positions.top;
          $controlSidebar.css('bottom', heights.footer - positions.bottom).css('top', top >= 0 ? top : 0);
          $controlsidebarContent.css('height', heights.window - (heights.footer - positions.bottom));
        } else {
          $controlSidebar.css('bottom', heights.footer);
        }
      } else if (positions.top <= heights.header) {
        if (navbarFixed === false) {
          $controlSidebar.css('top', heights.header - positions.top);
          $controlsidebarContent.css('height', heights.window - (heights.header - positions.top));
        } else {
          $controlSidebar.css('top', heights.header);
        }
      } else if (navbarFixed === false) {
        $controlSidebar.css('top', 0);
        $controlsidebarContent.css('height', heights.window);
      } else {
        $controlSidebar.css('top', heights.header);
      }
    };

    _proto._fixHeight = function _fixHeight() {
      var $body = $__default['default']('body');

      if (!$body.hasClass(CLASS_NAME_LAYOUT_FIXED)) {
        return;
      }

      var heights = {
        window: $__default['default'](window).height(),
        header: $__default['default'](SELECTOR_HEADER).outerHeight(),
        footer: $__default['default'](SELECTOR_FOOTER).outerHeight()
      };
      var sidebarHeight = heights.window - heights.header;

      if ($body.hasClass(CLASS_NAME_FOOTER_FIXED) || $body.hasClass(CLASS_NAME_FOOTER_SM_FIXED) || $body.hasClass(CLASS_NAME_FOOTER_MD_FIXED) || $body.hasClass(CLASS_NAME_FOOTER_LG_FIXED) || $body.hasClass(CLASS_NAME_FOOTER_XL_FIXED)) {
        if ($__default['default'](SELECTOR_FOOTER).css('position') === 'fixed') {
          sidebarHeight = heights.window - heights.header - heights.footer;
        }
      }

      var $controlSidebar = $__default['default'](SELECTOR_CONTROL_SIDEBAR + " " + SELECTOR_CONTROL_SIDEBAR_CONTENT);
      $controlSidebar.css('height', sidebarHeight);

      if (typeof $__default['default'].fn.overlayScrollbars !== 'undefined') {
        $controlSidebar.overlayScrollbars({
          className: this._config.scrollbarTheme,
          sizeAutoCapable: true,
          scrollbars: {
            autoHide: this._config.scrollbarAutoHide,
            clickScrolling: true
          }
        });
      }
    } // Static
    ;

    ControlSidebar._jQueryInterface = function _jQueryInterface(operation) {
      return this.each(function () {
        var data = $__default['default'](this).data(DATA_KEY$2);

        var _options = $__default['default'].extend({}, Default$2, $__default['default'](this).data());

        if (!data) {
          data = new ControlSidebar(this, _options);
          $__default['default'](this).data(DATA_KEY$2, data);
        }

        if (data[operation] === 'undefined') {
          throw new Error(operation + " is not a function");
        }

        data[operation]();
      });
    };

    return ControlSidebar;
  }();
  /**
   *
   * Data Api implementation
   * ====================================================
   */


  $__default['default'](document).on('click', SELECTOR_DATA_TOGGLE, function (event) {
    event.preventDefault();

    ControlSidebar._jQueryInterface.call($__default['default'](this), 'toggle');
  });
  /**
   * jQuery API
   * ====================================================
   */

  $__default['default'].fn[NAME$2] = ControlSidebar._jQueryInterface;
  $__default['default'].fn[NAME$2].Constructor = ControlSidebar;

  $__default['default'].fn[NAME$2].noConflict = function () {
    $__default['default'].fn[NAME$2] = JQUERY_NO_CONFLICT$2;
    return ControlSidebar._jQueryInterface;
  };
  /**
   * --------------------------------------------
   * AdminLTE DirectChat.js
   * License MIT
   * --------------------------------------------
   */

  /**
   * Constants
   * ====================================================
   */


  var NAME$3 = 'DirectChat';
  var DATA_KEY$3 = 'lte.directchat';
  var EVENT_KEY$3 = "." + DATA_KEY$3;
  var JQUERY_NO_CONFLICT$3 = $__default['default'].fn[NAME$3];
  var EVENT_TOGGLED = "toggled" + EVENT_KEY$3;
  var SELECTOR_DATA_TOGGLE$1 = '[data-widget="chat-pane-toggle"]';
  var SELECTOR_DIRECT_CHAT = '.direct-chat';
  var CLASS_NAME_DIRECT_CHAT_OPEN = 'direct-chat-contacts-open';
  /**
   * Class Definition
   * ====================================================
   */

  var DirectChat = /*#__PURE__*/function () {
    function DirectChat(element) {
      this._element = element;
    }

    var _proto = DirectChat.prototype;

    _proto.toggle = function toggle() {
      $__default['default'](this._element).parents(SELECTOR_DIRECT_CHAT).first().toggleClass(CLASS_NAME_DIRECT_CHAT_OPEN);
      $__default['default'](this._element).trigger($__default['default'].Event(EVENT_TOGGLED));
    } // Static
    ;

    DirectChat._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $__default['default'](this).data(DATA_KEY$3);

        if (!data) {
          data = new DirectChat($__default['default'](this));
          $__default['default'](this).data(DATA_KEY$3, data);
        }

        data[config]();
      });
    };

    return DirectChat;
  }();
  /**
   *
   * Data Api implementation
   * ====================================================
   */


  $__default['default'](document).on('click', SELECTOR_DATA_TOGGLE$1, function (event) {
    if (event) {
      event.preventDefault();
    }

    DirectChat._jQueryInterface.call($__default['default'](this), 'toggle');
  });
  /**
   * jQuery API
   * ====================================================
   */

  $__default['default'].fn[NAME$3] = DirectChat._jQueryInterface;
  $__default['default'].fn[NAME$3].Constructor = DirectChat;

  $__default['default'].fn[NAME$3].noConflict = function () {
    $__default['default'].fn[NAME$3] = JQUERY_NO_CONFLICT$3;
    return DirectChat._jQueryInterface;
  };
  /**
   * --------------------------------------------
   * AdminLTE Dropdown.js
   * License MIT
   * --------------------------------------------
   */

  /**
   * Constants
   * ====================================================
   */


  var NAME$4 = 'Dropdown';
  var DATA_KEY$4 = 'lte.dropdown';
  var JQUERY_NO_CONFLICT$4 = $__default['default'].fn[NAME$4];
  var SELECTOR_NAVBAR = '.navbar';
  var SELECTOR_DROPDOWN_MENU = '.dropdown-menu';
  var SELECTOR_DROPDOWN_MENU_ACTIVE = '.dropdown-menu.show';
  var SELECTOR_DROPDOWN_TOGGLE = '[data-toggle="dropdown"]';
  var CLASS_NAME_DROPDOWN_RIGHT = 'dropdown-menu-right';
  var CLASS_NAME_DROPDOWN_SUBMENU = 'dropdown-submenu'; // TODO: this is unused; should be removed along with the extend?

  var Default$3 = {};
  /**
   * Class Definition
   * ====================================================
   */

  var Dropdown = /*#__PURE__*/function () {
    function Dropdown(element, config) {
      this._config = config;
      this._element = element;
    } // Public


    var _proto = Dropdown.prototype;

    _proto.toggleSubmenu = function toggleSubmenu() {
      this._element.siblings().show().toggleClass('show');

      if (!this._element.next().hasClass('show')) {
        this._element.parents(SELECTOR_DROPDOWN_MENU).first().find('.show').removeClass('show').hide();
      }

      this._element.parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function () {
        $__default['default']('.dropdown-submenu .show').removeClass('show').hide();
      });
    };

    _proto.fixPosition = function fixPosition() {
      var $element = $__default['default'](SELECTOR_DROPDOWN_MENU_ACTIVE);

      if ($element.length === 0) {
        return;
      }

      if ($element.hasClass(CLASS_NAME_DROPDOWN_RIGHT)) {
        $element.css({
          left: 'inherit',
          right: 0
        });
      } else {
        $element.css({
          left: 0,
          right: 'inherit'
        });
      }

      var offset = $element.offset();
      var width = $element.width();
      var visiblePart = $__default['default'](window).width() - offset.left;

      if (offset.left < 0) {
        $element.css({
          left: 'inherit',
          right: offset.left - 5
        });
      } else if (visiblePart < width) {
        $element.css({
          left: 'inherit',
          right: 0
        });
      }
    } // Static
    ;

    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $__default['default'](this).data(DATA_KEY$4);

        var _config = $__default['default'].extend({}, Default$3, $__default['default'](this).data());

        if (!data) {
          data = new Dropdown($__default['default'](this), _config);
          $__default['default'](this).data(DATA_KEY$4, data);
        }

        if (config === 'toggleSubmenu' || config === 'fixPosition') {
          data[config]();
        }
      });
    };

    return Dropdown;
  }();
  /**
   * Data API
   * ====================================================
   */


  $__default['default'](SELECTOR_DROPDOWN_MENU + " " + SELECTOR_DROPDOWN_TOGGLE).on('click', function (event) {
    event.preventDefault();
    event.stopPropagation();

    Dropdown._jQueryInterface.call($__default['default'](this), 'toggleSubmenu');
  });
  $__default['default'](SELECTOR_NAVBAR + " " + SELECTOR_DROPDOWN_TOGGLE).on('click', function (event) {
    event.preventDefault();

    if ($__default['default'](event.target).parent().hasClass(CLASS_NAME_DROPDOWN_SUBMENU)) {
      return;
    }

    setTimeout(function () {
      Dropdown._jQueryInterface.call($__default['default'](this), 'fixPosition');
    }, 1);
  });
  /**
   * jQuery API
   * ====================================================
   */

  $__default['default'].fn[NAME$4] = Dropdown._jQueryInterface;
  $__default['default'].fn[NAME$4].Constructor = Dropdown;

  $__default['default'].fn[NAME$4].noConflict = function () {
    $__default['default'].fn[NAME$4] = JQUERY_NO_CONFLICT$4;
    return Dropdown._jQueryInterface;
  };
  /**
   * --------------------------------------------
   * AdminLTE ExpandableTable.js
   * License MIT
   * --------------------------------------------
   */

  /**
    * Constants
    * ====================================================
    */


  var NAME$5 = 'ExpandableTable';
  var DATA_KEY$5 = 'lte.expandableTable';
  var EVENT_KEY$4 = "." + DATA_KEY$5;
  var JQUERY_NO_CONFLICT$5 = $__default['default'].fn[NAME$5];
  var EVENT_EXPANDED$2 = "expanded" + EVENT_KEY$4;
  var EVENT_COLLAPSED$2 = "collapsed" + EVENT_KEY$4;
  var SELECTOR_TABLE = '.expandable-table';
  var SELECTOR_DATA_TOGGLE$2 = '[data-widget="expandable-table"]';
  var SELECTOR_ARIA_ATTR = 'aria-expanded';
  /**
    * Class Definition
    * ====================================================
    */

  var ExpandableTable = /*#__PURE__*/function () {
    function ExpandableTable(element, options) {
      this._options = options;
      this._element = element;
    } // Public


    var _proto = ExpandableTable.prototype;

    _proto.init = function init() {
      $__default['default'](SELECTOR_DATA_TOGGLE$2).each(function (_, $header) {
        var $type = $__default['default']($header).attr(SELECTOR_ARIA_ATTR);
        var $body = $__default['default']($header).next().children().first().children();

        if ($type === 'true') {
          $body.show();
        } else if ($type === 'false') {
          $body.hide();
          $body.parent().parent().addClass('d-none');
        }
      });
    };

    _proto.toggleRow = function toggleRow() {
      var $element = this._element;
      var time = 500;
      var $type = $element.attr(SELECTOR_ARIA_ATTR);
      var $body = $element.next().children().first().children();
      $body.stop();

      if ($type === 'true') {
        $body.slideUp(time, function () {
          $element.next().addClass('d-none');
        });
        $element.attr(SELECTOR_ARIA_ATTR, 'false');
        $element.trigger($__default['default'].Event(EVENT_COLLAPSED$2));
      } else if ($type === 'false') {
        $element.next().removeClass('d-none');
        $body.slideDown(time);
        $element.attr(SELECTOR_ARIA_ATTR, 'true');
        $element.trigger($__default['default'].Event(EVENT_EXPANDED$2));
      }
    } // Static
    ;

    ExpandableTable._jQueryInterface = function _jQueryInterface(operation) {
      return this.each(function () {
        var data = $__default['default'](this).data(DATA_KEY$5);

        if (!data) {
          data = new ExpandableTable($__default['default'](this));
          $__default['default'](this).data(DATA_KEY$5, data);
        }

        if (typeof operation === 'string' && operation.match(/init|toggleRow/)) {
          data[operation]();
        }
      });
    };

    return ExpandableTable;
  }();
  /**
    * Data API
    * ====================================================
    */


  $__default['default'](SELECTOR_TABLE).ready(function () {
    ExpandableTable._jQueryInterface.call($__default['default'](this), 'init');
  });
  $__default['default'](document).on('click', SELECTOR_DATA_TOGGLE$2, function () {
    ExpandableTable._jQueryInterface.call($__default['default'](this), 'toggleRow');
  });
  /**
    * jQuery API
    * ====================================================
    */

  $__default['default'].fn[NAME$5] = ExpandableTable._jQueryInterface;
  $__default['default'].fn[NAME$5].Constructor = ExpandableTable;

  $__default['default'].fn[NAME$5].noConflict = function () {
    $__default['default'].fn[NAME$5] = JQUERY_NO_CONFLICT$5;
    return ExpandableTable._jQueryInterface;
  };
  /**
   * --------------------------------------------
   * AdminLTE Fullscreen.js
   * License MIT
   * --------------------------------------------
   */

  /**
   * Constants
   * ====================================================
   */


  var NAME$6 = 'Fullscreen';
  var DATA_KEY$6 = 'lte.fullscreen';
  var JQUERY_NO_CONFLICT$6 = $__default['default'].fn[NAME$6];
  var SELECTOR_DATA_WIDGET = '[data-widget="fullscreen"]';
  var SELECTOR_ICON = SELECTOR_DATA_WIDGET + " i";
  var Default$4 = {
    minimizeIcon: 'fa-compress-arrows-alt',
    maximizeIcon: 'fa-expand-arrows-alt'
  };
  /**
   * Class Definition
   * ====================================================
   */

  var Fullscreen = /*#__PURE__*/function () {
    function Fullscreen(_element, _options) {
      this.element = _element;
      this.options = $__default['default'].extend({}, Default$4, _options);
    } // Public


    var _proto = Fullscreen.prototype;

    _proto.toggle = function toggle() {
      if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        this.windowed();
      } else {
        this.fullscreen();
      }
    };

    _proto.fullscreen = function fullscreen() {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }

      $__default['default'](SELECTOR_ICON).removeClass(this.options.maximizeIcon).addClass(this.options.minimizeIcon);
    };

    _proto.windowed = function windowed() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }

      $__default['default'](SELECTOR_ICON).removeClass(this.options.minimizeIcon).addClass(this.options.maximizeIcon);
    } // Static
    ;

    Fullscreen._jQueryInterface = function _jQueryInterface(config) {
      var data = $__default['default'](this).data(DATA_KEY$6);

      if (!data) {
        data = $__default['default'](this).data();
      }

      var _options = $__default['default'].extend({}, Default$4, _typeof(config) === 'object' ? config : data);

      var plugin = new Fullscreen($__default['default'](this), _options);
      $__default['default'](this).data(DATA_KEY$6, _typeof(config) === 'object' ? config : data);

      if (typeof config === 'string' && config.match(/toggle|fullscreen|windowed/)) {
        plugin[config]();
      } else {
        plugin.init();
      }
    };

    return Fullscreen;
  }();
  /**
    * Data API
    * ====================================================
    */


  $__default['default'](document).on('click', SELECTOR_DATA_WIDGET, function () {
    Fullscreen._jQueryInterface.call($__default['default'](this), 'toggle');
  });
  /**
   * jQuery API
   * ====================================================
   */

  $__default['default'].fn[NAME$6] = Fullscreen._jQueryInterface;
  $__default['default'].fn[NAME$6].Constructor = Fullscreen;

  $__default['default'].fn[NAME$6].noConflict = function () {
    $__default['default'].fn[NAME$6] = JQUERY_NO_CONFLICT$6;
    return Fullscreen._jQueryInterface;
  };
  /**
   * --------------------------------------------
   * AdminLTE Layout.js
   * License MIT
   * --------------------------------------------
   */

  /**
   * Constants
   * ====================================================
   */


  var NAME$7 = 'Layout';
  var DATA_KEY$7 = 'lte.layout';
  var JQUERY_NO_CONFLICT$7 = $__default['default'].fn[NAME$7];
  var SELECTOR_HEADER$1 = '.main-header';
  var SELECTOR_MAIN_SIDEBAR = '.main-sidebar';
  var SELECTOR_SIDEBAR = '.main-sidebar .sidebar';
  var SELECTOR_CONTENT = '.content-wrapper';
  var SELECTOR_CONTROL_SIDEBAR_CONTENT$1 = '.control-sidebar-content';
  var SELECTOR_CONTROL_SIDEBAR_BTN = '[data-widget="control-sidebar"]';
  var SELECTOR_FOOTER$1 = '.main-footer';
  var SELECTOR_PUSHMENU_BTN = '[data-widget="pushmenu"]';
  var SELECTOR_LOGIN_BOX = '.login-box';
  var SELECTOR_REGISTER_BOX = '.register-box';
  var CLASS_NAME_SIDEBAR_FOCUSED = 'sidebar-focused';
  var CLASS_NAME_LAYOUT_FIXED$1 = 'layout-fixed';
  var CLASS_NAME_CONTROL_SIDEBAR_SLIDE_OPEN = 'control-sidebar-slide-open';
  var CLASS_NAME_CONTROL_SIDEBAR_OPEN$1 = 'control-sidebar-open';
  var Default$5 = {
    scrollbarTheme: 'os-theme-light',
    scrollbarAutoHide: 'l',
    panelAutoHeight: true,
    loginRegisterAutoHeight: true
  };
  /**
   * Class Definition
   * ====================================================
   */

  var Layout = /*#__PURE__*/function () {
    function Layout(element, config) {
      this._config = config;
      this._element = element;

      this._init();
    } // Public


    var _proto = Layout.prototype;

    _proto.fixLayoutHeight = function fixLayoutHeight(extra) {
      if (extra === void 0) {
        extra = null;
      }

      var $body = $__default['default']('body');
      var controlSidebar = 0;

      if ($body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_SLIDE_OPEN) || $body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_OPEN$1) || extra === 'control_sidebar') {
        controlSidebar = $__default['default'](SELECTOR_CONTROL_SIDEBAR_CONTENT$1).height();
      }

      var heights = {
        window: $__default['default'](window).height(),
        header: $__default['default'](SELECTOR_HEADER$1).length !== 0 ? $__default['default'](SELECTOR_HEADER$1).outerHeight() : 0,
        footer: $__default['default'](SELECTOR_FOOTER$1).length !== 0 ? $__default['default'](SELECTOR_FOOTER$1).outerHeight() : 0,
        sidebar: $__default['default'](SELECTOR_SIDEBAR).length !== 0 ? $__default['default'](SELECTOR_SIDEBAR).height() : 0,
        controlSidebar: controlSidebar
      };

      var max = this._max(heights);

      var offset = this._config.panelAutoHeight;

      if (offset === true) {
        offset = 0;
      }

      var $contentSelector = $__default['default'](SELECTOR_CONTENT);

      if (offset !== false) {
        if (max === heights.controlSidebar) {
          $contentSelector.css('min-height', max + offset);
        } else if (max === heights.window) {
          $contentSelector.css('min-height', max + offset - heights.header - heights.footer);
        } else {
          $contentSelector.css('min-height', max + offset - heights.header);
        }

        if (this._isFooterFixed()) {
          $contentSelector.css('min-height', parseFloat($contentSelector.css('min-height')) + heights.footer);
        }
      }

      if (!$body.hasClass(CLASS_NAME_LAYOUT_FIXED$1)) {
        return;
      }

      if (offset !== false) {
        $contentSelector.css('min-height', max + offset - heights.header - heights.footer);
      }

      if (typeof $__default['default'].fn.overlayScrollbars !== 'undefined') {
        $__default['default'](SELECTOR_SIDEBAR).overlayScrollbars({
          className: this._config.scrollbarTheme,
          sizeAutoCapable: true,
          scrollbars: {
            autoHide: this._config.scrollbarAutoHide,
            clickScrolling: true
          }
        });
      }
    };

    _proto.fixLoginRegisterHeight = function fixLoginRegisterHeight() {
      var $body = $__default['default']('body');
      var $selector = $__default['default'](SELECTOR_LOGIN_BOX + ", " + SELECTOR_REGISTER_BOX);

      if ($selector.length === 0) {
        $body.css('height', 'auto');
        $__default['default']('html').css('height', 'auto');
      } else {
        var boxHeight = $selector.height();

        if ($body.css('min-height') !== boxHeight) {
          $body.css('min-height', boxHeight);
        }
      }
    } // Private
    ;

    _proto._init = function _init() {
      var _this = this; // Activate layout height watcher


      this.fixLayoutHeight();

      if (this._config.loginRegisterAutoHeight === true) {
        this.fixLoginRegisterHeight();
      } else if (this._config.loginRegisterAutoHeight === parseInt(this._config.loginRegisterAutoHeight, 10)) {
        setInterval(this.fixLoginRegisterHeight, this._config.loginRegisterAutoHeight);
      }

      $__default['default'](SELECTOR_SIDEBAR).on('collapsed.lte.treeview expanded.lte.treeview', function () {
        _this.fixLayoutHeight();
      });
      $__default['default'](SELECTOR_PUSHMENU_BTN).on('collapsed.lte.pushmenu shown.lte.pushmenu', function () {
        _this.fixLayoutHeight();
      });
      $__default['default'](SELECTOR_CONTROL_SIDEBAR_BTN).on('collapsed.lte.controlsidebar', function () {
        _this.fixLayoutHeight();
      }).on('expanded.lte.controlsidebar', function () {
        _this.fixLayoutHeight('control_sidebar');
      });
      $__default['default'](window).resize(function () {
        _this.fixLayoutHeight();
      });
      setTimeout(function () {
        $__default['default']('body.hold-transition').removeClass('hold-transition');
      }, 50);
    };

    _proto._max = function _max(numbers) {
      // Calculate the maximum number in a list
      var max = 0;
      Object.keys(numbers).forEach(function (key) {
        if (numbers[key] > max) {
          max = numbers[key];
        }
      });
      return max;
    };

    _proto._isFooterFixed = function _isFooterFixed() {
      return $__default['default'](SELECTOR_FOOTER$1).css('position') === 'fixed';
    } // Static
    ;

    Layout._jQueryInterface = function _jQueryInterface(config) {
      if (config === void 0) {
        config = '';
      }

      return this.each(function () {
        var data = $__default['default'](this).data(DATA_KEY$7);

        var _options = $__default['default'].extend({}, Default$5, $__default['default'](this).data());

        if (!data) {
          data = new Layout($__default['default'](this), _options);
          $__default['default'](this).data(DATA_KEY$7, data);
        }

        if (config === 'init' || config === '') {
          data._init();
        } else if (config === 'fixLayoutHeight' || config === 'fixLoginRegisterHeight') {
          data[config]();
        }
      });
    };

    return Layout;
  }();
  /**
   * Data API
   * ====================================================
   */


  $__default['default'](window).on('load', function () {
    Layout._jQueryInterface.call($__default['default']('body'));
  });
  $__default['default'](SELECTOR_SIDEBAR + " a").on('focusin', function () {
    $__default['default'](SELECTOR_MAIN_SIDEBAR).addClass(CLASS_NAME_SIDEBAR_FOCUSED);
  });
  $__default['default'](SELECTOR_SIDEBAR + " a").on('focusout', function () {
    $__default['default'](SELECTOR_MAIN_SIDEBAR).removeClass(CLASS_NAME_SIDEBAR_FOCUSED);
  });
  /**
   * jQuery API
   * ====================================================
   */

  $__default['default'].fn[NAME$7] = Layout._jQueryInterface;
  $__default['default'].fn[NAME$7].Constructor = Layout;

  $__default['default'].fn[NAME$7].noConflict = function () {
    $__default['default'].fn[NAME$7] = JQUERY_NO_CONFLICT$7;
    return Layout._jQueryInterface;
  };
  /**
   * --------------------------------------------
   * AdminLTE PushMenu.js
   * License MIT
   * --------------------------------------------
   */

  /**
   * Constants
   * ====================================================
   */


  var NAME$8 = 'PushMenu';
  var DATA_KEY$8 = 'lte.pushmenu';
  var EVENT_KEY$5 = "." + DATA_KEY$8;
  var JQUERY_NO_CONFLICT$8 = $__default['default'].fn[NAME$8];
  var EVENT_COLLAPSED$3 = "collapsed" + EVENT_KEY$5;
  var EVENT_SHOWN = "shown" + EVENT_KEY$5;
  var SELECTOR_TOGGLE_BUTTON = '[data-widget="pushmenu"]';
  var SELECTOR_BODY = 'body';
  var SELECTOR_OVERLAY = '#sidebar-overlay';
  var SELECTOR_WRAPPER = '.wrapper';
  var CLASS_NAME_COLLAPSED$1 = 'sidebar-collapse';
  var CLASS_NAME_OPEN = 'sidebar-open';
  var CLASS_NAME_IS_OPENING = 'sidebar-is-opening';
  var CLASS_NAME_CLOSED = 'sidebar-closed';
  var Default$6 = {
    autoCollapseSize: 992,
    enableRemember: false,
    noTransitionAfterReload: true
  };
  /**
   * Class Definition
   * ====================================================
   */

  var PushMenu = /*#__PURE__*/function () {
    function PushMenu(element, options) {
      this._element = element;
      this._options = $__default['default'].extend({}, Default$6, options);

      if ($__default['default'](SELECTOR_OVERLAY).length === 0) {
        this._addOverlay();
      }

      this._init();
    } // Public


    var _proto = PushMenu.prototype;

    _proto.expand = function expand() {
      var $bodySelector = $__default['default'](SELECTOR_BODY);

      if (this._options.autoCollapseSize) {
        if ($__default['default'](window).width() <= this._options.autoCollapseSize) {
          $bodySelector.addClass(CLASS_NAME_OPEN);
        }
      }

      $bodySelector.addClass(CLASS_NAME_IS_OPENING).removeClass(CLASS_NAME_COLLAPSED$1 + " " + CLASS_NAME_CLOSED).delay(50).queue(function () {
        $bodySelector.removeClass(CLASS_NAME_IS_OPENING);
        $__default['default'](this).dequeue();
      });

      if (this._options.enableRemember) {
        localStorage.setItem("remember" + EVENT_KEY$5, CLASS_NAME_OPEN);
      }

      $__default['default'](this._element).trigger($__default['default'].Event(EVENT_SHOWN));
    };

    _proto.collapse = function collapse() {
      var $bodySelector = $__default['default'](SELECTOR_BODY);

      if (this._options.autoCollapseSize) {
        if ($__default['default'](window).width() <= this._options.autoCollapseSize) {
          $bodySelector.removeClass(CLASS_NAME_OPEN).addClass(CLASS_NAME_CLOSED);
        }
      }

      $bodySelector.addClass(CLASS_NAME_COLLAPSED$1);

      if (this._options.enableRemember) {
        localStorage.setItem("remember" + EVENT_KEY$5, CLASS_NAME_COLLAPSED$1);
      }

      $__default['default'](this._element).trigger($__default['default'].Event(EVENT_COLLAPSED$3));
    };

    _proto.toggle = function toggle() {
      if ($__default['default'](SELECTOR_BODY).hasClass(CLASS_NAME_COLLAPSED$1)) {
        this.expand();
      } else {
        this.collapse();
      }
    };

    _proto.autoCollapse = function autoCollapse(resize) {
      if (resize === void 0) {
        resize = false;
      }

      if (!this._options.autoCollapseSize) {
        return;
      }

      var $bodySelector = $__default['default'](SELECTOR_BODY);

      if ($__default['default'](window).width() <= this._options.autoCollapseSize) {
        if (!$bodySelector.hasClass(CLASS_NAME_OPEN)) {
          this.collapse();
        }
      } else if (resize === true) {
        if ($bodySelector.hasClass(CLASS_NAME_OPEN)) {
          $bodySelector.removeClass(CLASS_NAME_OPEN);
        } else if ($bodySelector.hasClass(CLASS_NAME_CLOSED)) {
          this.expand();
        }
      }
    };

    _proto.remember = function remember() {
      if (!this._options.enableRemember) {
        return;
      }

      var $body = $__default['default']('body');
      var toggleState = localStorage.getItem("remember" + EVENT_KEY$5);

      if (toggleState === CLASS_NAME_COLLAPSED$1) {
        if (this._options.noTransitionAfterReload) {
          $body.addClass('hold-transition').addClass(CLASS_NAME_COLLAPSED$1).delay(50).queue(function () {
            $__default['default'](this).removeClass('hold-transition');
            $__default['default'](this).dequeue();
          });
        } else {
          $body.addClass(CLASS_NAME_COLLAPSED$1);
        }
      } else if (this._options.noTransitionAfterReload) {
        $body.addClass('hold-transition').removeClass(CLASS_NAME_COLLAPSED$1).delay(50).queue(function () {
          $__default['default'](this).removeClass('hold-transition');
          $__default['default'](this).dequeue();
        });
      } else {
        $body.removeClass(CLASS_NAME_COLLAPSED$1);
      }
    } // Private
    ;

    _proto._init = function _init() {
      var _this = this;

      this.remember();
      this.autoCollapse();
      $__default['default'](window).resize(function () {
        _this.autoCollapse(true);
      });
    };

    _proto._addOverlay = function _addOverlay() {
      var _this2 = this;

      var overlay = $__default['default']('<div />', {
        id: 'sidebar-overlay'
      });
      overlay.on('click', function () {
        _this2.collapse();
      });
      $__default['default'](SELECTOR_WRAPPER).append(overlay);
    } // Static
    ;

    PushMenu._jQueryInterface = function _jQueryInterface(operation) {
      return this.each(function () {
        var data = $__default['default'](this).data(DATA_KEY$8);

        var _options = $__default['default'].extend({}, Default$6, $__default['default'](this).data());

        if (!data) {
          data = new PushMenu(this, _options);
          $__default['default'](this).data(DATA_KEY$8, data);
        }

        if (typeof operation === 'string' && operation.match(/collapse|expand|toggle/)) {
          data[operation]();
        }
      });
    };

    return PushMenu;
  }();
  /**
   * Data API
   * ====================================================
   */


  $__default['default'](document).on('click', SELECTOR_TOGGLE_BUTTON, function (event) {
    event.preventDefault();
    var button = event.currentTarget;

    if ($__default['default'](button).data('widget') !== 'pushmenu') {
      button = $__default['default'](button).closest(SELECTOR_TOGGLE_BUTTON);
    }

    PushMenu._jQueryInterface.call($__default['default'](button), 'toggle');
  });
  $__default['default'](window).on('load', function () {
    PushMenu._jQueryInterface.call($__default['default'](SELECTOR_TOGGLE_BUTTON));
  });
  /**
   * jQuery API
   * ====================================================
   */

  $__default['default'].fn[NAME$8] = PushMenu._jQueryInterface;
  $__default['default'].fn[NAME$8].Constructor = PushMenu;

  $__default['default'].fn[NAME$8].noConflict = function () {
    $__default['default'].fn[NAME$8] = JQUERY_NO_CONFLICT$8;
    return PushMenu._jQueryInterface;
  };
  /**
   * --------------------------------------------
   * AdminLTE SidebarSearch.js
   * License MIT
   * --------------------------------------------
   */

  /**
   * Constants
   * ====================================================
   */


  var NAME$9 = 'SidebarSearch';
  var DATA_KEY$9 = 'lte.sidebar-search';
  var JQUERY_NO_CONFLICT$9 = $__default['default'].fn[NAME$9];
  var CLASS_NAME_OPEN$1 = 'sidebar-search-open';
  var CLASS_NAME_ICON_SEARCH = 'fa-search';
  var CLASS_NAME_ICON_CLOSE = 'fa-times';
  var CLASS_NAME_HEADER = 'nav-header';
  var CLASS_NAME_SEARCH_RESULTS = 'sidebar-search-results';
  var CLASS_NAME_LIST_GROUP = 'list-group';
  var SELECTOR_DATA_WIDGET$1 = '[data-widget="sidebar-search"]';
  var SELECTOR_SIDEBAR$1 = '.main-sidebar .nav-sidebar';
  var SELECTOR_NAV_LINK = '.nav-link';
  var SELECTOR_NAV_TREEVIEW = '.nav-treeview';
  var SELECTOR_SEARCH_INPUT = SELECTOR_DATA_WIDGET$1 + " .form-control";
  var SELECTOR_SEARCH_BUTTON = SELECTOR_DATA_WIDGET$1 + " .btn";
  var SELECTOR_SEARCH_ICON = SELECTOR_SEARCH_BUTTON + " i";
  var SELECTOR_SEARCH_LIST_GROUP = "." + CLASS_NAME_LIST_GROUP;
  var SELECTOR_SEARCH_RESULTS = "." + CLASS_NAME_SEARCH_RESULTS;
  var SELECTOR_SEARCH_RESULTS_GROUP = SELECTOR_SEARCH_RESULTS + " ." + CLASS_NAME_LIST_GROUP;
  var Default$7 = {
    arrowSign: '->',
    minLength: 3,
    maxResults: 7,
    highlightName: true,
    highlightPath: false,
    highlightClass: 'text-light',
    notFoundText: 'No element found!'
  };
  var SearchItems = [];
  /**
   * Class Definition
   * ====================================================
   */

  var SidebarSearch = /*#__PURE__*/function () {
    function SidebarSearch(_element, _options) {
      this.element = _element;
      this.options = $__default['default'].extend({}, Default$7, _options);
      this.items = [];
    } // Public


    var _proto = SidebarSearch.prototype;

    _proto.init = function init() {
      var _this = this;

      if ($__default['default'](SELECTOR_DATA_WIDGET$1).length == 0) {
        return;
      }

      if ($__default['default'](SELECTOR_DATA_WIDGET$1).next(SELECTOR_SEARCH_RESULTS).length == 0) {
        $__default['default'](SELECTOR_DATA_WIDGET$1).after($__default['default']('<div />', {
          "class": CLASS_NAME_SEARCH_RESULTS
        }));
      }

      if ($__default['default'](SELECTOR_SEARCH_RESULTS).children(SELECTOR_SEARCH_LIST_GROUP).length == 0) {
        $__default['default'](SELECTOR_SEARCH_RESULTS).append($__default['default']('<div />', {
          "class": CLASS_NAME_LIST_GROUP
        }));
      }

      this._addNotFound();

      $__default['default'](SELECTOR_SIDEBAR$1).children().each(function (i, child) {
        _this._parseItem(child);
      });
    };

    _proto.search = function search() {
      var _this2 = this;

      var searchValue = $__default['default'](SELECTOR_SEARCH_INPUT).val().toLowerCase();

      if (searchValue.length < this.options.minLength) {
        $__default['default'](SELECTOR_SEARCH_RESULTS_GROUP).empty();

        this._addNotFound();

        this.close();
        return;
      }

      var searchResults = SearchItems.filter(function (item) {
        return item.name.toLowerCase().includes(searchValue);
      });
      var endResults = $__default['default'](searchResults.slice(0, this.options.maxResults));
      $__default['default'](SELECTOR_SEARCH_RESULTS_GROUP).empty();

      if (endResults.length === 0) {
        this._addNotFound();
      } else {
        endResults.each(function (i, result) {
          $__default['default'](SELECTOR_SEARCH_RESULTS_GROUP).append(_this2._renderItem(result.name, result.link, result.path));
        });
      }

      this.open();
    };

    _proto.open = function open() {
      $__default['default'](SELECTOR_DATA_WIDGET$1).parent().addClass(CLASS_NAME_OPEN$1);
      $__default['default'](SELECTOR_SEARCH_ICON).removeClass(CLASS_NAME_ICON_SEARCH).addClass(CLASS_NAME_ICON_CLOSE);
    };

    _proto.close = function close() {
      $__default['default'](SELECTOR_DATA_WIDGET$1).parent().removeClass(CLASS_NAME_OPEN$1);
      $__default['default'](SELECTOR_SEARCH_ICON).removeClass(CLASS_NAME_ICON_CLOSE).addClass(CLASS_NAME_ICON_SEARCH);
    };

    _proto.toggle = function toggle() {
      if ($__default['default'](SELECTOR_DATA_WIDGET$1).parent().hasClass(CLASS_NAME_OPEN$1)) {
        this.close();
      } else {
        this.open();
      }
    } // Private
    ;

    _proto._parseItem = function _parseItem(item, path) {
      var _this3 = this;

      if (path === void 0) {
        path = [];
      }

      if ($__default['default'](item).hasClass(CLASS_NAME_HEADER)) {
        return;
      }

      var itemObject = {};
      var navLink = $__default['default'](item).clone().find("> " + SELECTOR_NAV_LINK);
      var navTreeview = $__default['default'](item).clone().find("> " + SELECTOR_NAV_TREEVIEW);
      var link = navLink.attr('href');
      var name = navLink.find('p').children().remove().end().text();
      itemObject.name = this._trimText(name);
      itemObject.link = link;
      itemObject.path = path;

      if (navTreeview.length === 0) {
        SearchItems.push(itemObject);
      } else {
        var newPath = itemObject.path.concat([itemObject.name]);
        navTreeview.children().each(function (i, child) {
          _this3._parseItem(child, newPath);
        });
      }
    };

    _proto._trimText = function _trimText(text) {
      return $.trim(text.replace(/(\r\n|\n|\r)/gm, ' '));
    };

    _proto._renderItem = function _renderItem(name, link, path) {
      var _this4 = this;

      path = path.join(" " + this.options.arrowSign + " ");

      if (this.options.highlightName || this.options.highlightPath) {
        var searchValue = $__default['default'](SELECTOR_SEARCH_INPUT).val().toLowerCase();
        var regExp = new RegExp(searchValue, 'gi');

        if (this.options.highlightName) {
          name = name.replace(regExp, function (str) {
            return "<b class=\"" + _this4.options.highlightClass + "\">" + str + "</b>";
          });
        }

        if (this.options.highlightPath) {
          path = path.replace(regExp, function (str) {
            return "<b class=\"" + _this4.options.highlightClass + "\">" + str + "</b>";
          });
        }
      }

      return "<a href=\"" + link + "\" class=\"list-group-item\">\n        <div class=\"search-title\">\n          " + name + "\n        </div>\n        <div class=\"search-path\">\n          " + path + "\n        </div>\n      </a>";
    };

    _proto._addNotFound = function _addNotFound() {
      $__default['default'](SELECTOR_SEARCH_RESULTS_GROUP).append(this._renderItem(this.options.notFoundText, '#', []));
    } // Static
    ;

    SidebarSearch._jQueryInterface = function _jQueryInterface(config) {
      var data = $__default['default'](this).data(DATA_KEY$9);

      if (!data) {
        data = $__default['default'](this).data();
      }

      var _options = $__default['default'].extend({}, Default$7, _typeof(config) === 'object' ? config : data);

      var plugin = new SidebarSearch($__default['default'](this), _options);
      $__default['default'](this).data(DATA_KEY$9, _typeof(config) === 'object' ? config : data);

      if (typeof config === 'string' && config.match(/init|toggle|close|open|search/)) {
        plugin[config]();
      } else {
        plugin.init();
      }
    };

    return SidebarSearch;
  }();
  /**
   * Data API
   * ====================================================
   */


  $__default['default'](document).on('click', SELECTOR_SEARCH_BUTTON, function (event) {
    event.preventDefault();

    SidebarSearch._jQueryInterface.call($__default['default'](SELECTOR_DATA_WIDGET$1), 'toggle');
  });
  $__default['default'](document).on('keyup', SELECTOR_SEARCH_INPUT, function (event) {
    if (event.keyCode == 38) {
      event.preventDefault();
      $__default['default'](SELECTOR_SEARCH_RESULTS_GROUP).children().last().focus();
      return;
    }

    if (event.keyCode == 40) {
      event.preventDefault();
      $__default['default'](SELECTOR_SEARCH_RESULTS_GROUP).children().first().focus();
      return;
    }

    var timer = 0;
    clearTimeout(timer);
    timer = setTimeout(function () {
      SidebarSearch._jQueryInterface.call($__default['default'](SELECTOR_DATA_WIDGET$1), 'search');
    }, 100);
  });
  $__default['default'](document).on('keydown', SELECTOR_SEARCH_RESULTS_GROUP, function (event) {
    var $focused = $__default['default'](':focus');

    if (event.keyCode == 38) {
      event.preventDefault();

      if ($focused.is(':first-child')) {
        $focused.siblings().last().focus();
      } else {
        $focused.prev().focus();
      }
    }

    if (event.keyCode == 40) {
      event.preventDefault();

      if ($focused.is(':last-child')) {
        $focused.siblings().first().focus();
      } else {
        $focused.next().focus();
      }
    }
  });
  $__default['default'](window).on('load', function () {
    SidebarSearch._jQueryInterface.call($__default['default'](SELECTOR_DATA_WIDGET$1), 'init');
  });
  /**
   * jQuery API
   * ====================================================
   */

  $__default['default'].fn[NAME$9] = SidebarSearch._jQueryInterface;
  $__default['default'].fn[NAME$9].Constructor = SidebarSearch;

  $__default['default'].fn[NAME$9].noConflict = function () {
    $__default['default'].fn[NAME$9] = JQUERY_NO_CONFLICT$9;
    return SidebarSearch._jQueryInterface;
  };
  /**
   * --------------------------------------------
   * AdminLTE Toasts.js
   * License MIT
   * --------------------------------------------
   */

  /**
   * Constants
   * ====================================================
   */


  var NAME$a = 'Toasts';
  var DATA_KEY$a = 'lte.toasts';
  var EVENT_KEY$6 = "." + DATA_KEY$a;
  var JQUERY_NO_CONFLICT$a = $__default['default'].fn[NAME$a];
  var EVENT_INIT = "init" + EVENT_KEY$6;
  var EVENT_CREATED = "created" + EVENT_KEY$6;
  var EVENT_REMOVED$1 = "removed" + EVENT_KEY$6;
  var SELECTOR_CONTAINER_TOP_RIGHT = '#toastsContainerTopRight';
  var SELECTOR_CONTAINER_TOP_LEFT = '#toastsContainerTopLeft';
  var SELECTOR_CONTAINER_BOTTOM_RIGHT = '#toastsContainerBottomRight';
  var SELECTOR_CONTAINER_BOTTOM_LEFT = '#toastsContainerBottomLeft';
  var CLASS_NAME_TOP_RIGHT = 'toasts-top-right';
  var CLASS_NAME_TOP_LEFT = 'toasts-top-left';
  var CLASS_NAME_BOTTOM_RIGHT = 'toasts-bottom-right';
  var CLASS_NAME_BOTTOM_LEFT = 'toasts-bottom-left';
  var POSITION_TOP_RIGHT = 'topRight';
  var POSITION_TOP_LEFT = 'topLeft';
  var POSITION_BOTTOM_RIGHT = 'bottomRight';
  var POSITION_BOTTOM_LEFT = 'bottomLeft';
  var Default$8 = {
    position: POSITION_TOP_RIGHT,
    fixed: true,
    autohide: false,
    autoremove: true,
    delay: 1000,
    fade: true,
    icon: null,
    image: null,
    imageAlt: null,
    imageHeight: '25px',
    title: null,
    subtitle: null,
    close: true,
    body: null,
    "class": null
  };
  /**
   * Class Definition
   * ====================================================
   */

  var Toasts = /*#__PURE__*/function () {
    function Toasts(element, config) {
      this._config = config;

      this._prepareContainer();

      $__default['default']('body').trigger($__default['default'].Event(EVENT_INIT));
    } // Public


    var _proto = Toasts.prototype;

    _proto.create = function create() {
      var toast = $__default['default']('<div class="toast" role="alert" aria-live="assertive" aria-atomic="true"/>');
      toast.data('autohide', this._config.autohide);
      toast.data('animation', this._config.fade);

      if (this._config["class"]) {
        toast.addClass(this._config["class"]);
      }

      if (this._config.delay && this._config.delay != 500) {
        toast.data('delay', this._config.delay);
      }

      var toastHeader = $__default['default']('<div class="toast-header">');

      if (this._config.image != null) {
        var toastImage = $__default['default']('<img />').addClass('rounded mr-2').attr('src', this._config.image).attr('alt', this._config.imageAlt);

        if (this._config.imageHeight != null) {
          toastImage.height(this._config.imageHeight).width('auto');
        }

        toastHeader.append(toastImage);
      }

      if (this._config.icon != null) {
        toastHeader.append($__default['default']('<i />').addClass('mr-2').addClass(this._config.icon));
      }

      if (this._config.title != null) {
        toastHeader.append($__default['default']('<strong />').addClass('mr-auto').html(this._config.title));
      }

      if (this._config.subtitle != null) {
        toastHeader.append($__default['default']('<small />').html(this._config.subtitle));
      }

      if (this._config.close == true) {
        var toastClose = $__default['default']('<button data-dismiss="toast" />').attr('type', 'button').addClass('ml-2 mb-1 close').attr('aria-label', 'Close').append('<span aria-hidden="true">&times;</span>');

        if (this._config.title == null) {
          toastClose.toggleClass('ml-2 ml-auto');
        }

        toastHeader.append(toastClose);
      }

      toast.append(toastHeader);

      if (this._config.body != null) {
        toast.append($__default['default']('<div class="toast-body" />').html(this._config.body));
      }

      $__default['default'](this._getContainerId()).prepend(toast);
      var $body = $__default['default']('body');
      $body.trigger($__default['default'].Event(EVENT_CREATED));
      toast.toast('show');

      if (this._config.autoremove) {
        toast.on('hidden.bs.toast', function () {
          $__default['default'](this).delay(200).remove();
          $body.trigger($__default['default'].Event(EVENT_REMOVED$1));
        });
      }
    } // Static
    ;

    _proto._getContainerId = function _getContainerId() {
      if (this._config.position == POSITION_TOP_RIGHT) {
        return SELECTOR_CONTAINER_TOP_RIGHT;
      }

      if (this._config.position == POSITION_TOP_LEFT) {
        return SELECTOR_CONTAINER_TOP_LEFT;
      }

      if (this._config.position == POSITION_BOTTOM_RIGHT) {
        return SELECTOR_CONTAINER_BOTTOM_RIGHT;
      }

      if (this._config.position == POSITION_BOTTOM_LEFT) {
        return SELECTOR_CONTAINER_BOTTOM_LEFT;
      }
    };

    _proto._prepareContainer = function _prepareContainer() {
      if ($__default['default'](this._getContainerId()).length === 0) {
        var container = $__default['default']('<div />').attr('id', this._getContainerId().replace('#', ''));

        if (this._config.position == POSITION_TOP_RIGHT) {
          container.addClass(CLASS_NAME_TOP_RIGHT);
        } else if (this._config.position == POSITION_TOP_LEFT) {
          container.addClass(CLASS_NAME_TOP_LEFT);
        } else if (this._config.position == POSITION_BOTTOM_RIGHT) {
          container.addClass(CLASS_NAME_BOTTOM_RIGHT);
        } else if (this._config.position == POSITION_BOTTOM_LEFT) {
          container.addClass(CLASS_NAME_BOTTOM_LEFT);
        }

        $__default['default']('body').append(container);
      }

      if (this._config.fixed) {
        $__default['default'](this._getContainerId()).addClass('fixed');
      } else {
        $__default['default'](this._getContainerId()).removeClass('fixed');
      }
    } // Static
    ;

    Toasts._jQueryInterface = function _jQueryInterface(option, config) {
      return this.each(function () {
        var _options = $__default['default'].extend({}, Default$8, config);

        var toast = new Toasts($__default['default'](this), _options);

        if (option === 'create') {
          toast[option]();
        }
      });
    };

    return Toasts;
  }();
  /**
   * jQuery API
   * ====================================================
   */


  $__default['default'].fn[NAME$a] = Toasts._jQueryInterface;
  $__default['default'].fn[NAME$a].Constructor = Toasts;

  $__default['default'].fn[NAME$a].noConflict = function () {
    $__default['default'].fn[NAME$a] = JQUERY_NO_CONFLICT$a;
    return Toasts._jQueryInterface;
  };
  /**
   * --------------------------------------------
   * AdminLTE TodoList.js
   * License MIT
   * --------------------------------------------
   */

  /**
   * Constants
   * ====================================================
   */


  var NAME$b = 'TodoList';
  var DATA_KEY$b = 'lte.todolist';
  var JQUERY_NO_CONFLICT$b = $__default['default'].fn[NAME$b];
  var SELECTOR_DATA_TOGGLE$3 = '[data-widget="todo-list"]';
  var CLASS_NAME_TODO_LIST_DONE = 'done';
  var Default$9 = {
    onCheck: function onCheck(item) {
      return item;
    },
    onUnCheck: function onUnCheck(item) {
      return item;
    }
  };
  /**
   * Class Definition
   * ====================================================
   */

  var TodoList = /*#__PURE__*/function () {
    function TodoList(element, config) {
      this._config = config;
      this._element = element;

      this._init();
    } // Public


    var _proto = TodoList.prototype;

    _proto.toggle = function toggle(item) {
      item.parents('li').toggleClass(CLASS_NAME_TODO_LIST_DONE);

      if (!$__default['default'](item).prop('checked')) {
        this.unCheck($__default['default'](item));
        return;
      }

      this.check(item);
    };

    _proto.check = function check(item) {
      this._config.onCheck.call(item);
    };

    _proto.unCheck = function unCheck(item) {
      this._config.onUnCheck.call(item);
    } // Private
    ;

    _proto._init = function _init() {
      var _this = this;

      var $toggleSelector = this._element;
      $toggleSelector.find('input:checkbox:checked').parents('li').toggleClass(CLASS_NAME_TODO_LIST_DONE);
      $toggleSelector.on('change', 'input:checkbox', function (event) {
        _this.toggle($__default['default'](event.target));
      });
    } // Static
    ;

    TodoList._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $__default['default'](this).data(DATA_KEY$b);

        if (!data) {
          data = $__default['default'](this).data();
        }

        var _options = $__default['default'].extend({}, Default$9, _typeof(config) === 'object' ? config : data);

        var plugin = new TodoList($__default['default'](this), _options);
        $__default['default'](this).data(DATA_KEY$b, _typeof(config) === 'object' ? config : data);

        if (config === 'init') {
          plugin[config]();
        }
      });
    };

    return TodoList;
  }();
  /**
   * Data API
   * ====================================================
   */


  $__default['default'](window).on('load', function () {
    TodoList._jQueryInterface.call($__default['default'](SELECTOR_DATA_TOGGLE$3));
  });
  /**
   * jQuery API
   * ====================================================
   */

  $__default['default'].fn[NAME$b] = TodoList._jQueryInterface;
  $__default['default'].fn[NAME$b].Constructor = TodoList;

  $__default['default'].fn[NAME$b].noConflict = function () {
    $__default['default'].fn[NAME$b] = JQUERY_NO_CONFLICT$b;
    return TodoList._jQueryInterface;
  };
  /**
   * --------------------------------------------
   * AdminLTE Treeview.js
   * License MIT
   * --------------------------------------------
   */

  /**
   * Constants
   * ====================================================
   */


  var NAME$c = 'Treeview';
  var DATA_KEY$c = 'lte.treeview';
  var EVENT_KEY$7 = "." + DATA_KEY$c;
  var JQUERY_NO_CONFLICT$c = $__default['default'].fn[NAME$c];
  var EVENT_EXPANDED$3 = "expanded" + EVENT_KEY$7;
  var EVENT_COLLAPSED$4 = "collapsed" + EVENT_KEY$7;
  var EVENT_LOAD_DATA_API = "load" + EVENT_KEY$7;
  var SELECTOR_LI = '.nav-item';
  var SELECTOR_LINK = '.nav-link';
  var SELECTOR_TREEVIEW_MENU = '.nav-treeview';
  var SELECTOR_OPEN = '.menu-open';
  var SELECTOR_DATA_WIDGET$2 = '[data-widget="treeview"]';
  var CLASS_NAME_OPEN$2 = 'menu-open';
  var CLASS_NAME_IS_OPENING$1 = 'menu-is-opening';
  var CLASS_NAME_SIDEBAR_COLLAPSED = 'sidebar-collapse';
  var Default$a = {
    trigger: SELECTOR_DATA_WIDGET$2 + " " + SELECTOR_LINK,
    animationSpeed: 300,
    accordion: true,
    expandSidebar: false,
    sidebarButtonSelector: '[data-widget="pushmenu"]'
  };
  /**
   * Class Definition
   * ====================================================
   */

  var Treeview = /*#__PURE__*/function () {
    function Treeview(element, config) {
      this._config = config;
      this._element = element;
    } // Public


    var _proto = Treeview.prototype;

    _proto.init = function init() {
      $__default['default']("" + SELECTOR_LI + SELECTOR_OPEN + " " + SELECTOR_TREEVIEW_MENU).css('display', 'block');

      this._setupListeners();
    };

    _proto.expand = function expand(treeviewMenu, parentLi) {
      var _this = this;

      var expandedEvent = $__default['default'].Event(EVENT_EXPANDED$3);

      if (this._config.accordion) {
        var openMenuLi = parentLi.siblings(SELECTOR_OPEN).first();
        var openTreeview = openMenuLi.find(SELECTOR_TREEVIEW_MENU).first();
        this.collapse(openTreeview, openMenuLi);
      }

      parentLi.addClass(CLASS_NAME_IS_OPENING$1);
      treeviewMenu.stop().slideDown(this._config.animationSpeed, function () {
        parentLi.addClass(CLASS_NAME_OPEN$2);
        $__default['default'](_this._element).trigger(expandedEvent);
      });

      if (this._config.expandSidebar) {
        this._expandSidebar();
      }
    };

    _proto.collapse = function collapse(treeviewMenu, parentLi) {
      var _this2 = this;

      var collapsedEvent = $__default['default'].Event(EVENT_COLLAPSED$4);
      parentLi.removeClass(CLASS_NAME_IS_OPENING$1 + " " + CLASS_NAME_OPEN$2);
      treeviewMenu.stop().slideUp(this._config.animationSpeed, function () {
        $__default['default'](_this2._element).trigger(collapsedEvent);
        treeviewMenu.find(SELECTOR_OPEN + " > " + SELECTOR_TREEVIEW_MENU).slideUp();
        treeviewMenu.find(SELECTOR_OPEN).removeClass(CLASS_NAME_OPEN$2);
      });
    };

    _proto.toggle = function toggle(event) {
      var $relativeTarget = $__default['default'](event.currentTarget);
      var $parent = $relativeTarget.parent();
      var treeviewMenu = $parent.find("> " + SELECTOR_TREEVIEW_MENU);

      if (!treeviewMenu.is(SELECTOR_TREEVIEW_MENU)) {
        if (!$parent.is(SELECTOR_LI)) {
          treeviewMenu = $parent.parent().find("> " + SELECTOR_TREEVIEW_MENU);
        }

        if (!treeviewMenu.is(SELECTOR_TREEVIEW_MENU)) {
          return;
        }
      }

      event.preventDefault();
      var parentLi = $relativeTarget.parents(SELECTOR_LI).first();
      var isOpen = parentLi.hasClass(CLASS_NAME_OPEN$2);

      if (isOpen) {
        this.collapse($__default['default'](treeviewMenu), parentLi);
      } else {
        this.expand($__default['default'](treeviewMenu), parentLi);
      }
    } // Private
    ;

    _proto._setupListeners = function _setupListeners() {
      var _this3 = this;

      var elementId = this._element.attr('id') !== undefined ? "#" + this._element.attr('id') : '';
      $__default['default'](document).on('click', "" + elementId + this._config.trigger, function (event) {
        _this3.toggle(event);
      });
    };

    _proto._expandSidebar = function _expandSidebar() {
      if ($__default['default']('body').hasClass(CLASS_NAME_SIDEBAR_COLLAPSED)) {
        $__default['default'](this._config.sidebarButtonSelector).PushMenu('expand');
      }
    } // Static
    ;

    Treeview._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $__default['default'](this).data(DATA_KEY$c);

        var _options = $__default['default'].extend({}, Default$a, $__default['default'](this).data());

        if (!data) {
          data = new Treeview($__default['default'](this), _options);
          $__default['default'](this).data(DATA_KEY$c, data);
        }

        if (config === 'init') {
          data[config]();
        }
      });
    };

    return Treeview;
  }();
  /**
   * Data API
   * ====================================================
   */


  $__default['default'](window).on(EVENT_LOAD_DATA_API, function () {
    $__default['default'](SELECTOR_DATA_WIDGET$2).each(function () {
      Treeview._jQueryInterface.call($__default['default'](this), 'init');
    });
  });
  /**
   * jQuery API
   * ====================================================
   */

  $__default['default'].fn[NAME$c] = Treeview._jQueryInterface;
  $__default['default'].fn[NAME$c].Constructor = Treeview;

  $__default['default'].fn[NAME$c].noConflict = function () {
    $__default['default'].fn[NAME$c] = JQUERY_NO_CONFLICT$c;
    return Treeview._jQueryInterface;
  };

  exports.CardRefresh = CardRefresh;
  exports.CardWidget = CardWidget;
  exports.ControlSidebar = ControlSidebar;
  exports.DirectChat = DirectChat;
  exports.Dropdown = Dropdown;
  exports.ExpandableTable = ExpandableTable;
  exports.Fullscreen = Fullscreen;
  exports.Layout = Layout;
  exports.PushMenu = PushMenu;
  exports.SidebarSearch = SidebarSearch;
  exports.Toasts = Toasts;
  exports.TodoList = TodoList;
  exports.Treeview = Treeview;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});

/***/ }),

/***/ "./resources/templates/dashboard/AdminLTE/dist/js/demo.js":
/*!****************************************************************!*\
  !*** ./resources/templates/dashboard/AdminLTE/dist/js/demo.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * AdminLTE Demo Menu
 * ------------------
 * You should not use this file in production.
 * This file is for demo purposes only.
 */

/* eslint-disable camelcase */
(function ($) {
  'use strict';

  var $sidebar = $('.control-sidebar');
  var $container = $('<div />', {
    "class": 'p-3 control-sidebar-content'
  });
  $sidebar.append($container);
  var navbar_dark_skins = ['navbar-primary', 'navbar-secondary', 'navbar-info', 'navbar-success', 'navbar-danger', 'navbar-indigo', 'navbar-purple', 'navbar-pink', 'navbar-navy', 'navbar-lightblue', 'navbar-teal', 'navbar-cyan', 'navbar-dark', 'navbar-gray-dark', 'navbar-gray'];
  var navbar_light_skins = ['navbar-light', 'navbar-warning', 'navbar-white', 'navbar-orange'];
  $container.append('<h5>Customize AdminLTE</h5><hr class="mb-2"/>');
  var $no_border_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('.main-header').hasClass('border-bottom-0'),
    "class": 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.main-header').addClass('border-bottom-0');
    } else {
      $('.main-header').removeClass('border-bottom-0');
    }
  });
  var $no_border_container = $('<div />', {
    "class": 'mb-1'
  }).append($no_border_checkbox).append('<span>No Navbar border</span>');
  $container.append($no_border_container);
  var $text_sm_body_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('body').hasClass('text-sm'),
    "class": 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('body').addClass('text-sm');
    } else {
      $('body').removeClass('text-sm');
    }
  });
  var $text_sm_body_container = $('<div />', {
    "class": 'mb-1'
  }).append($text_sm_body_checkbox).append('<span>Body small text</span>');
  $container.append($text_sm_body_container);
  var $text_sm_header_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('.main-header').hasClass('text-sm'),
    "class": 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.main-header').addClass('text-sm');
    } else {
      $('.main-header').removeClass('text-sm');
    }
  });
  var $text_sm_header_container = $('<div />', {
    "class": 'mb-1'
  }).append($text_sm_header_checkbox).append('<span>Navbar small text</span>');
  $container.append($text_sm_header_container);
  var $text_sm_sidebar_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('.nav-sidebar').hasClass('text-sm'),
    "class": 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.nav-sidebar').addClass('text-sm');
    } else {
      $('.nav-sidebar').removeClass('text-sm');
    }
  });
  var $text_sm_sidebar_container = $('<div />', {
    "class": 'mb-1'
  }).append($text_sm_sidebar_checkbox).append('<span>Sidebar nav small text</span>');
  $container.append($text_sm_sidebar_container);
  var $text_sm_footer_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('.main-footer').hasClass('text-sm'),
    "class": 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.main-footer').addClass('text-sm');
    } else {
      $('.main-footer').removeClass('text-sm');
    }
  });
  var $text_sm_footer_container = $('<div />', {
    "class": 'mb-1'
  }).append($text_sm_footer_checkbox).append('<span>Footer small text</span>');
  $container.append($text_sm_footer_container);
  var $flat_sidebar_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('.nav-sidebar').hasClass('nav-flat'),
    "class": 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.nav-sidebar').addClass('nav-flat');
    } else {
      $('.nav-sidebar').removeClass('nav-flat');
    }
  });
  var $flat_sidebar_container = $('<div />', {
    "class": 'mb-1'
  }).append($flat_sidebar_checkbox).append('<span>Sidebar nav flat style</span>');
  $container.append($flat_sidebar_container);
  var $legacy_sidebar_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('.nav-sidebar').hasClass('nav-legacy'),
    "class": 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.nav-sidebar').addClass('nav-legacy');
    } else {
      $('.nav-sidebar').removeClass('nav-legacy');
    }
  });
  var $legacy_sidebar_container = $('<div />', {
    "class": 'mb-1'
  }).append($legacy_sidebar_checkbox).append('<span>Sidebar nav legacy style</span>');
  $container.append($legacy_sidebar_container);
  var $compact_sidebar_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('.nav-sidebar').hasClass('nav-compact'),
    "class": 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.nav-sidebar').addClass('nav-compact');
    } else {
      $('.nav-sidebar').removeClass('nav-compact');
    }
  });
  var $compact_sidebar_container = $('<div />', {
    "class": 'mb-1'
  }).append($compact_sidebar_checkbox).append('<span>Sidebar nav compact</span>');
  $container.append($compact_sidebar_container);
  var $child_indent_sidebar_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('.nav-sidebar').hasClass('nav-child-indent'),
    "class": 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.nav-sidebar').addClass('nav-child-indent');
    } else {
      $('.nav-sidebar').removeClass('nav-child-indent');
    }
  });
  var $child_indent_sidebar_container = $('<div />', {
    "class": 'mb-1'
  }).append($child_indent_sidebar_checkbox).append('<span>Sidebar nav child indent</span>');
  $container.append($child_indent_sidebar_container);
  var $child_hide_sidebar_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('.nav-sidebar').hasClass('nav-collapse-hide-child'),
    "class": 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.nav-sidebar').addClass('nav-collapse-hide-child');
    } else {
      $('.nav-sidebar').removeClass('nav-collapse-hide-child');
    }
  });
  var $child_hide_sidebar_container = $('<div />', {
    "class": 'mb-1'
  }).append($child_hide_sidebar_checkbox).append('<span>Sidebar nav child hide on collapse</span>');
  $container.append($child_hide_sidebar_container);
  var $no_expand_sidebar_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('.main-sidebar').hasClass('sidebar-no-expand'),
    "class": 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.main-sidebar').addClass('sidebar-no-expand');
    } else {
      $('.main-sidebar').removeClass('sidebar-no-expand');
    }
  });
  var $no_expand_sidebar_container = $('<div />', {
    "class": 'mb-1'
  }).append($no_expand_sidebar_checkbox).append('<span>Main Sidebar disable hover/focus auto expand</span>');
  $container.append($no_expand_sidebar_container);
  var $text_sm_brand_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('.brand-link').hasClass('text-sm'),
    "class": 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.brand-link').addClass('text-sm');
    } else {
      $('.brand-link').removeClass('text-sm');
    }
  });
  var $text_sm_brand_container = $('<div />', {
    "class": 'mb-1'
  }).append($text_sm_brand_checkbox).append('<span>Brand small text</span>');
  $container.append($text_sm_brand_container);
  var $dark_mode_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('body').hasClass('dark-mode'),
    "class": 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('body').addClass('dark-mode');
    } else {
      $('body').removeClass('dark-mode');
    }
  });
  var $dark_mode_container = $('<div />', {
    "class": 'mb-4'
  }).append($dark_mode_checkbox).append('<span>Dark Mode</span>');
  $container.append($dark_mode_container);
  $container.append('<h6>Navbar Variants</h6>');
  var $navbar_variants = $('<div />', {
    "class": 'd-flex'
  });
  var navbar_all_colors = navbar_dark_skins.concat(navbar_light_skins);
  var $navbar_variants_colors = createSkinBlock(navbar_all_colors, function () {
    var color = $(this).data('color');
    var $main_header = $('.main-header');
    $main_header.removeClass('navbar-dark').removeClass('navbar-light');
    navbar_all_colors.forEach(function (color) {
      $main_header.removeClass(color);
    });

    if (navbar_dark_skins.indexOf(color) > -1) {
      $main_header.addClass('navbar-dark');
    } else {
      $main_header.addClass('navbar-light');
    }

    $main_header.addClass(color);
  });
  $navbar_variants.append($navbar_variants_colors);
  $container.append($navbar_variants);
  var sidebar_colors = ['bg-primary', 'bg-warning', 'bg-info', 'bg-danger', 'bg-success', 'bg-indigo', 'bg-lightblue', 'bg-navy', 'bg-purple', 'bg-fuchsia', 'bg-pink', 'bg-maroon', 'bg-orange', 'bg-lime', 'bg-teal', 'bg-olive'];
  var accent_colors = ['accent-primary', 'accent-warning', 'accent-info', 'accent-danger', 'accent-success', 'accent-indigo', 'accent-lightblue', 'accent-navy', 'accent-purple', 'accent-fuchsia', 'accent-pink', 'accent-maroon', 'accent-orange', 'accent-lime', 'accent-teal', 'accent-olive'];
  var sidebar_skins = ['sidebar-dark-primary', 'sidebar-dark-warning', 'sidebar-dark-info', 'sidebar-dark-danger', 'sidebar-dark-success', 'sidebar-dark-indigo', 'sidebar-dark-lightblue', 'sidebar-dark-navy', 'sidebar-dark-purple', 'sidebar-dark-fuchsia', 'sidebar-dark-pink', 'sidebar-dark-maroon', 'sidebar-dark-orange', 'sidebar-dark-lime', 'sidebar-dark-teal', 'sidebar-dark-olive', 'sidebar-light-primary', 'sidebar-light-warning', 'sidebar-light-info', 'sidebar-light-danger', 'sidebar-light-success', 'sidebar-light-indigo', 'sidebar-light-lightblue', 'sidebar-light-navy', 'sidebar-light-purple', 'sidebar-light-fuchsia', 'sidebar-light-pink', 'sidebar-light-maroon', 'sidebar-light-orange', 'sidebar-light-lime', 'sidebar-light-teal', 'sidebar-light-olive'];
  $container.append('<h6>Accent Color Variants</h6>');
  var $accent_variants = $('<div />', {
    "class": 'd-flex'
  });
  $container.append($accent_variants);
  $container.append(createSkinBlock(accent_colors, function () {
    var color = $(this).data('color');
    var accent_class = color;
    var $body = $('body');
    accent_colors.forEach(function (skin) {
      $body.removeClass(skin);
    });
    $body.addClass(accent_class);
  }));
  $container.append('<h6>Dark Sidebar Variants</h6>');
  var $sidebar_variants_dark = $('<div />', {
    "class": 'd-flex'
  });
  $container.append($sidebar_variants_dark);
  $container.append(createSkinBlock(sidebar_colors, function () {
    var color = $(this).data('color');
    var sidebar_class = 'sidebar-dark-' + color.replace('bg-', '');
    var $sidebar = $('.main-sidebar');
    sidebar_skins.forEach(function (skin) {
      $sidebar.removeClass(skin);
    });
    $sidebar.addClass(sidebar_class);
  }));
  $container.append('<h6>Light Sidebar Variants</h6>');
  var $sidebar_variants_light = $('<div />', {
    "class": 'd-flex'
  });
  $container.append($sidebar_variants_light);
  $container.append(createSkinBlock(sidebar_colors, function () {
    var color = $(this).data('color');
    var sidebar_class = 'sidebar-light-' + color.replace('bg-', '');
    var $sidebar = $('.main-sidebar');
    sidebar_skins.forEach(function (skin) {
      $sidebar.removeClass(skin);
    });
    $sidebar.addClass(sidebar_class);
  }));
  var logo_skins = navbar_all_colors;
  $container.append('<h6>Brand Logo Variants</h6>');
  var $logo_variants = $('<div />', {
    "class": 'd-flex'
  });
  $container.append($logo_variants);
  var $clear_btn = $('<a />', {
    href: '#'
  }).text('clear').on('click', function (e) {
    e.preventDefault();
    var $logo = $('.brand-link');
    logo_skins.forEach(function (skin) {
      $logo.removeClass(skin);
    });
  });
  $container.append(createSkinBlock(logo_skins, function () {
    var color = $(this).data('color');
    var $logo = $('.brand-link');
    logo_skins.forEach(function (skin) {
      $logo.removeClass(skin);
    });
    $logo.addClass(color);
  }).append($clear_btn));

  function createSkinBlock(colors, callback) {
    var $block = $('<div />', {
      "class": 'd-flex flex-wrap mb-3'
    });
    colors.forEach(function (color) {
      var $color = $('<div />', {
        "class": (_typeof(color) === 'object' ? color.join(' ') : color).replace('navbar-', 'bg-').replace('accent-', 'bg-') + ' elevation-2'
      });
      $block.append($color);
      $color.data('color', color);
      $color.css({
        width: '40px',
        height: '20px',
        borderRadius: '25px',
        marginRight: 10,
        marginBottom: 10,
        opacity: 0.8,
        cursor: 'pointer'
      });
      $color.hover(function () {
        $(this).css({
          opacity: 1
        }).removeClass('elevation-2').addClass('elevation-4');
      }, function () {
        $(this).css({
          opacity: 0.8
        }).removeClass('elevation-4').addClass('elevation-2');
      });

      if (callback) {
        $color.on('click', callback);
      }
    });
    return $block;
  }

  $('.product-image-thumb').on('click', function () {
    var image_element = $(this).find('img');
    $('.product-image').prop('src', $(image_element).attr('src'));
    $('.product-image-thumb.active').removeClass('active');
    $(this).addClass('active');
  });
})(jQuery);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/templates/dashboard/AdminLTE/plugins/bootstrap/js/bootstrap.bundle.min.js":
/*!*********************************************************************************************!*\
  !*** ./resources/templates/dashboard/AdminLTE/plugins/bootstrap/js/bootstrap.bundle.min.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
  * Bootstrap v4.5.2 (https://getbootstrap.com/)
  * Copyright 2011-2020 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
!function (t, e) {
  "object" == ( false ? undefined : _typeof(exports)) && "undefined" != typeof module ? e(exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (e),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(this, function (t, e) {
  "use strict";

  function n(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
    }
  }

  function i(t, e, i) {
    return e && n(t.prototype, e), i && n(t, i), t;
  }

  function o() {
    return (o = Object.assign || function (t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];

        for (var i in n) {
          Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
        }
      }

      return t;
    }).apply(this, arguments);
  }

  e = e && Object.prototype.hasOwnProperty.call(e, "default") ? e["default"] : e;

  function r(t) {
    var n = this,
        i = !1;
    return e(this).one(s.TRANSITION_END, function () {
      i = !0;
    }), setTimeout(function () {
      i || s.triggerTransitionEnd(n);
    }, t), this;
  }

  var s = {
    TRANSITION_END: "bsTransitionEnd",
    getUID: function getUID(t) {
      do {
        t += ~~(1e6 * Math.random());
      } while (document.getElementById(t));

      return t;
    },
    getSelectorFromElement: function getSelectorFromElement(t) {
      var e = t.getAttribute("data-target");

      if (!e || "#" === e) {
        var n = t.getAttribute("href");
        e = n && "#" !== n ? n.trim() : "";
      }

      try {
        return document.querySelector(e) ? e : null;
      } catch (t) {
        return null;
      }
    },
    getTransitionDurationFromElement: function getTransitionDurationFromElement(t) {
      if (!t) return 0;
      var n = e(t).css("transition-duration"),
          i = e(t).css("transition-delay"),
          o = parseFloat(n),
          r = parseFloat(i);
      return o || r ? (n = n.split(",")[0], i = i.split(",")[0], 1e3 * (parseFloat(n) + parseFloat(i))) : 0;
    },
    reflow: function reflow(t) {
      return t.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(t) {
      e(t).trigger("transitionend");
    },
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean("transitionend");
    },
    isElement: function isElement(t) {
      return (t[0] || t).nodeType;
    },
    typeCheckConfig: function typeCheckConfig(t, e, n) {
      for (var i in n) {
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          var o = n[i],
              r = e[i],
              a = r && s.isElement(r) ? "element" : null === (l = r) || "undefined" == typeof l ? "" + l : {}.toString.call(l).match(/\s([a-z]+)/i)[1].toLowerCase();
          if (!new RegExp(o).test(a)) throw new Error(t.toUpperCase() + ': Option "' + i + '" provided type "' + a + '" but expected type "' + o + '".');
        }
      }

      var l;
    },
    findShadowRoot: function findShadowRoot(t) {
      if (!document.documentElement.attachShadow) return null;

      if ("function" == typeof t.getRootNode) {
        var e = t.getRootNode();
        return e instanceof ShadowRoot ? e : null;
      }

      return t instanceof ShadowRoot ? t : t.parentNode ? s.findShadowRoot(t.parentNode) : null;
    },
    jQueryDetection: function jQueryDetection() {
      if ("undefined" == typeof e) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
      var t = e.fn.jquery.split(" ")[0].split(".");
      if (t[0] < 2 && t[1] < 9 || 1 === t[0] && 9 === t[1] && t[2] < 1 || t[0] >= 4) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0");
    }
  };
  s.jQueryDetection(), e.fn.emulateTransitionEnd = r, e.event.special[s.TRANSITION_END] = {
    bindType: "transitionend",
    delegateType: "transitionend",
    handle: function handle(t) {
      if (e(t.target).is(this)) return t.handleObj.handler.apply(this, arguments);
    }
  };

  var a = "alert",
      l = e.fn[a],
      c = function () {
    function t(t) {
      this._element = t;
    }

    var n = t.prototype;
    return n.close = function (t) {
      var e = this._element;
      t && (e = this._getRootElement(t)), this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e);
    }, n.dispose = function () {
      e.removeData(this._element, "bs.alert"), this._element = null;
    }, n._getRootElement = function (t) {
      var n = s.getSelectorFromElement(t),
          i = !1;
      return n && (i = document.querySelector(n)), i || (i = e(t).closest(".alert")[0]), i;
    }, n._triggerCloseEvent = function (t) {
      var n = e.Event("close.bs.alert");
      return e(t).trigger(n), n;
    }, n._removeElement = function (t) {
      var n = this;

      if (e(t).removeClass("show"), e(t).hasClass("fade")) {
        var i = s.getTransitionDurationFromElement(t);
        e(t).one(s.TRANSITION_END, function (e) {
          return n._destroyElement(t, e);
        }).emulateTransitionEnd(i);
      } else this._destroyElement(t);
    }, n._destroyElement = function (t) {
      e(t).detach().trigger("closed.bs.alert").remove();
    }, t._jQueryInterface = function (n) {
      return this.each(function () {
        var i = e(this),
            o = i.data("bs.alert");
        o || (o = new t(this), i.data("bs.alert", o)), "close" === n && o[n](this);
      });
    }, t._handleDismiss = function (t) {
      return function (e) {
        e && e.preventDefault(), t.close(this);
      };
    }, i(t, null, [{
      key: "VERSION",
      get: function get() {
        return "4.5.2";
      }
    }]), t;
  }();

  e(document).on("click.bs.alert.data-api", '[data-dismiss="alert"]', c._handleDismiss(new c())), e.fn[a] = c._jQueryInterface, e.fn[a].Constructor = c, e.fn[a].noConflict = function () {
    return e.fn[a] = l, c._jQueryInterface;
  };

  var h = e.fn.button,
      u = function () {
    function t(t) {
      this._element = t;
    }

    var n = t.prototype;
    return n.toggle = function () {
      var t = !0,
          n = !0,
          i = e(this._element).closest('[data-toggle="buttons"]')[0];

      if (i) {
        var o = this._element.querySelector('input:not([type="hidden"])');

        if (o) {
          if ("radio" === o.type) if (o.checked && this._element.classList.contains("active")) t = !1;else {
            var r = i.querySelector(".active");
            r && e(r).removeClass("active");
          }
          t && ("checkbox" !== o.type && "radio" !== o.type || (o.checked = !this._element.classList.contains("active")), e(o).trigger("change")), o.focus(), n = !1;
        }
      }

      this._element.hasAttribute("disabled") || this._element.classList.contains("disabled") || (n && this._element.setAttribute("aria-pressed", !this._element.classList.contains("active")), t && e(this._element).toggleClass("active"));
    }, n.dispose = function () {
      e.removeData(this._element, "bs.button"), this._element = null;
    }, t._jQueryInterface = function (n) {
      return this.each(function () {
        var i = e(this).data("bs.button");
        i || (i = new t(this), e(this).data("bs.button", i)), "toggle" === n && i[n]();
      });
    }, i(t, null, [{
      key: "VERSION",
      get: function get() {
        return "4.5.2";
      }
    }]), t;
  }();

  e(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (t) {
    var n = t.target,
        i = n;
    if (e(n).hasClass("btn") || (n = e(n).closest(".btn")[0]), !n || n.hasAttribute("disabled") || n.classList.contains("disabled")) t.preventDefault();else {
      var o = n.querySelector('input:not([type="hidden"])');
      if (o && (o.hasAttribute("disabled") || o.classList.contains("disabled"))) return void t.preventDefault();
      ("LABEL" !== i.tagName || o && "checkbox" !== o.type) && u._jQueryInterface.call(e(n), "toggle");
    }
  }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (t) {
    var n = e(t.target).closest(".btn")[0];
    e(n).toggleClass("focus", /^focus(in)?$/.test(t.type));
  }), e(window).on("load.bs.button.data-api", function () {
    for (var t = [].slice.call(document.querySelectorAll('[data-toggle="buttons"] .btn')), e = 0, n = t.length; e < n; e++) {
      var i = t[e],
          o = i.querySelector('input:not([type="hidden"])');
      o.checked || o.hasAttribute("checked") ? i.classList.add("active") : i.classList.remove("active");
    }

    for (var r = 0, s = (t = [].slice.call(document.querySelectorAll('[data-toggle="button"]'))).length; r < s; r++) {
      var a = t[r];
      "true" === a.getAttribute("aria-pressed") ? a.classList.add("active") : a.classList.remove("active");
    }
  }), e.fn.button = u._jQueryInterface, e.fn.button.Constructor = u, e.fn.button.noConflict = function () {
    return e.fn.button = h, u._jQueryInterface;
  };

  var f = "carousel",
      d = ".bs.carousel",
      p = e.fn[f],
      m = {
    interval: 5e3,
    keyboard: !0,
    slide: !1,
    pause: "hover",
    wrap: !0,
    touch: !0
  },
      g = {
    interval: "(number|boolean)",
    keyboard: "boolean",
    slide: "(boolean|string)",
    pause: "(string|boolean)",
    wrap: "boolean",
    touch: "boolean"
  },
      _ = {
    TOUCH: "touch",
    PEN: "pen"
  },
      v = function () {
    function t(t, e) {
      this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(e), this._element = t, this._indicatorsElement = this._element.querySelector(".carousel-indicators"), this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0, this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent), this._addEventListeners();
    }

    var n = t.prototype;
    return n.next = function () {
      this._isSliding || this._slide("next");
    }, n.nextWhenVisible = function () {
      !document.hidden && e(this._element).is(":visible") && "hidden" !== e(this._element).css("visibility") && this.next();
    }, n.prev = function () {
      this._isSliding || this._slide("prev");
    }, n.pause = function (t) {
      t || (this._isPaused = !0), this._element.querySelector(".carousel-item-next, .carousel-item-prev") && (s.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null;
    }, n.cycle = function (t) {
      t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval));
    }, n.to = function (t) {
      var n = this;
      this._activeElement = this._element.querySelector(".active.carousel-item");

      var i = this._getItemIndex(this._activeElement);

      if (!(t > this._items.length - 1 || t < 0)) if (this._isSliding) e(this._element).one("slid.bs.carousel", function () {
        return n.to(t);
      });else {
        if (i === t) return this.pause(), void this.cycle();
        var o = t > i ? "next" : "prev";

        this._slide(o, this._items[t]);
      }
    }, n.dispose = function () {
      e(this._element).off(d), e.removeData(this._element, "bs.carousel"), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null;
    }, n._getConfig = function (t) {
      return t = o({}, m, t), s.typeCheckConfig(f, t, g), t;
    }, n._handleSwipe = function () {
      var t = Math.abs(this.touchDeltaX);

      if (!(t <= 40)) {
        var e = t / this.touchDeltaX;
        this.touchDeltaX = 0, e > 0 && this.prev(), e < 0 && this.next();
      }
    }, n._addEventListeners = function () {
      var t = this;
      this._config.keyboard && e(this._element).on("keydown.bs.carousel", function (e) {
        return t._keydown(e);
      }), "hover" === this._config.pause && e(this._element).on("mouseenter.bs.carousel", function (e) {
        return t.pause(e);
      }).on("mouseleave.bs.carousel", function (e) {
        return t.cycle(e);
      }), this._config.touch && this._addTouchEventListeners();
    }, n._addTouchEventListeners = function () {
      var t = this;

      if (this._touchSupported) {
        var n = function n(e) {
          t._pointerEvent && _[e.originalEvent.pointerType.toUpperCase()] ? t.touchStartX = e.originalEvent.clientX : t._pointerEvent || (t.touchStartX = e.originalEvent.touches[0].clientX);
        },
            i = function i(e) {
          t._pointerEvent && _[e.originalEvent.pointerType.toUpperCase()] && (t.touchDeltaX = e.originalEvent.clientX - t.touchStartX), t._handleSwipe(), "hover" === t._config.pause && (t.pause(), t.touchTimeout && clearTimeout(t.touchTimeout), t.touchTimeout = setTimeout(function (e) {
            return t.cycle(e);
          }, 500 + t._config.interval));
        };

        e(this._element.querySelectorAll(".carousel-item img")).on("dragstart.bs.carousel", function (t) {
          return t.preventDefault();
        }), this._pointerEvent ? (e(this._element).on("pointerdown.bs.carousel", function (t) {
          return n(t);
        }), e(this._element).on("pointerup.bs.carousel", function (t) {
          return i(t);
        }), this._element.classList.add("pointer-event")) : (e(this._element).on("touchstart.bs.carousel", function (t) {
          return n(t);
        }), e(this._element).on("touchmove.bs.carousel", function (e) {
          return function (e) {
            e.originalEvent.touches && e.originalEvent.touches.length > 1 ? t.touchDeltaX = 0 : t.touchDeltaX = e.originalEvent.touches[0].clientX - t.touchStartX;
          }(e);
        }), e(this._element).on("touchend.bs.carousel", function (t) {
          return i(t);
        }));
      }
    }, n._keydown = function (t) {
      if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
        case 37:
          t.preventDefault(), this.prev();
          break;

        case 39:
          t.preventDefault(), this.next();
      }
    }, n._getItemIndex = function (t) {
      return this._items = t && t.parentNode ? [].slice.call(t.parentNode.querySelectorAll(".carousel-item")) : [], this._items.indexOf(t);
    }, n._getItemByDirection = function (t, e) {
      var n = "next" === t,
          i = "prev" === t,
          o = this._getItemIndex(e),
          r = this._items.length - 1;

      if ((i && 0 === o || n && o === r) && !this._config.wrap) return e;
      var s = (o + ("prev" === t ? -1 : 1)) % this._items.length;
      return -1 === s ? this._items[this._items.length - 1] : this._items[s];
    }, n._triggerSlideEvent = function (t, n) {
      var i = this._getItemIndex(t),
          o = this._getItemIndex(this._element.querySelector(".active.carousel-item")),
          r = e.Event("slide.bs.carousel", {
        relatedTarget: t,
        direction: n,
        from: o,
        to: i
      });

      return e(this._element).trigger(r), r;
    }, n._setActiveIndicatorElement = function (t) {
      if (this._indicatorsElement) {
        var n = [].slice.call(this._indicatorsElement.querySelectorAll(".active"));
        e(n).removeClass("active");

        var i = this._indicatorsElement.children[this._getItemIndex(t)];

        i && e(i).addClass("active");
      }
    }, n._slide = function (t, n) {
      var i,
          o,
          r,
          a = this,
          l = this._element.querySelector(".active.carousel-item"),
          c = this._getItemIndex(l),
          h = n || l && this._getItemByDirection(t, l),
          u = this._getItemIndex(h),
          f = Boolean(this._interval);

      if ("next" === t ? (i = "carousel-item-left", o = "carousel-item-next", r = "left") : (i = "carousel-item-right", o = "carousel-item-prev", r = "right"), h && e(h).hasClass("active")) this._isSliding = !1;else if (!this._triggerSlideEvent(h, r).isDefaultPrevented() && l && h) {
        this._isSliding = !0, f && this.pause(), this._setActiveIndicatorElement(h);
        var d = e.Event("slid.bs.carousel", {
          relatedTarget: h,
          direction: r,
          from: c,
          to: u
        });

        if (e(this._element).hasClass("slide")) {
          e(h).addClass(o), s.reflow(h), e(l).addClass(i), e(h).addClass(i);
          var p = parseInt(h.getAttribute("data-interval"), 10);
          p ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = p) : this._config.interval = this._config.defaultInterval || this._config.interval;
          var m = s.getTransitionDurationFromElement(l);
          e(l).one(s.TRANSITION_END, function () {
            e(h).removeClass(i + " " + o).addClass("active"), e(l).removeClass("active " + o + " " + i), a._isSliding = !1, setTimeout(function () {
              return e(a._element).trigger(d);
            }, 0);
          }).emulateTransitionEnd(m);
        } else e(l).removeClass("active"), e(h).addClass("active"), this._isSliding = !1, e(this._element).trigger(d);

        f && this.cycle();
      }
    }, t._jQueryInterface = function (n) {
      return this.each(function () {
        var i = e(this).data("bs.carousel"),
            r = o({}, m, e(this).data());
        "object" == _typeof(n) && (r = o({}, r, n));
        var s = "string" == typeof n ? n : r.slide;
        if (i || (i = new t(this, r), e(this).data("bs.carousel", i)), "number" == typeof n) i.to(n);else if ("string" == typeof s) {
          if ("undefined" == typeof i[s]) throw new TypeError('No method named "' + s + '"');
          i[s]();
        } else r.interval && r.ride && (i.pause(), i.cycle());
      });
    }, t._dataApiClickHandler = function (n) {
      var i = s.getSelectorFromElement(this);

      if (i) {
        var r = e(i)[0];

        if (r && e(r).hasClass("carousel")) {
          var a = o({}, e(r).data(), e(this).data()),
              l = this.getAttribute("data-slide-to");
          l && (a.interval = !1), t._jQueryInterface.call(e(r), a), l && e(r).data("bs.carousel").to(l), n.preventDefault();
        }
      }
    }, i(t, null, [{
      key: "VERSION",
      get: function get() {
        return "4.5.2";
      }
    }, {
      key: "Default",
      get: function get() {
        return m;
      }
    }]), t;
  }();

  e(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", v._dataApiClickHandler), e(window).on("load.bs.carousel.data-api", function () {
    for (var t = [].slice.call(document.querySelectorAll('[data-ride="carousel"]')), n = 0, i = t.length; n < i; n++) {
      var o = e(t[n]);

      v._jQueryInterface.call(o, o.data());
    }
  }), e.fn[f] = v._jQueryInterface, e.fn[f].Constructor = v, e.fn[f].noConflict = function () {
    return e.fn[f] = p, v._jQueryInterface;
  };

  var b = "collapse",
      y = e.fn[b],
      w = {
    toggle: !0,
    parent: ""
  },
      E = {
    toggle: "boolean",
    parent: "(string|element)"
  },
      T = function () {
    function t(t, e) {
      this._isTransitioning = !1, this._element = t, this._config = this._getConfig(e), this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]'));

      for (var n = [].slice.call(document.querySelectorAll('[data-toggle="collapse"]')), i = 0, o = n.length; i < o; i++) {
        var r = n[i],
            a = s.getSelectorFromElement(r),
            l = [].slice.call(document.querySelectorAll(a)).filter(function (e) {
          return e === t;
        });
        null !== a && l.length > 0 && (this._selector = a, this._triggerArray.push(r));
      }

      this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle();
    }

    var n = t.prototype;
    return n.toggle = function () {
      e(this._element).hasClass("show") ? this.hide() : this.show();
    }, n.show = function () {
      var n,
          i,
          o = this;

      if (!this._isTransitioning && !e(this._element).hasClass("show") && (this._parent && 0 === (n = [].slice.call(this._parent.querySelectorAll(".show, .collapsing")).filter(function (t) {
        return "string" == typeof o._config.parent ? t.getAttribute("data-parent") === o._config.parent : t.classList.contains("collapse");
      })).length && (n = null), !(n && (i = e(n).not(this._selector).data("bs.collapse")) && i._isTransitioning))) {
        var r = e.Event("show.bs.collapse");

        if (e(this._element).trigger(r), !r.isDefaultPrevented()) {
          n && (t._jQueryInterface.call(e(n).not(this._selector), "hide"), i || e(n).data("bs.collapse", null));

          var a = this._getDimension();

          e(this._element).removeClass("collapse").addClass("collapsing"), this._element.style[a] = 0, this._triggerArray.length && e(this._triggerArray).removeClass("collapsed").attr("aria-expanded", !0), this.setTransitioning(!0);
          var l = "scroll" + (a[0].toUpperCase() + a.slice(1)),
              c = s.getTransitionDurationFromElement(this._element);
          e(this._element).one(s.TRANSITION_END, function () {
            e(o._element).removeClass("collapsing").addClass("collapse show"), o._element.style[a] = "", o.setTransitioning(!1), e(o._element).trigger("shown.bs.collapse");
          }).emulateTransitionEnd(c), this._element.style[a] = this._element[l] + "px";
        }
      }
    }, n.hide = function () {
      var t = this;

      if (!this._isTransitioning && e(this._element).hasClass("show")) {
        var n = e.Event("hide.bs.collapse");

        if (e(this._element).trigger(n), !n.isDefaultPrevented()) {
          var i = this._getDimension();

          this._element.style[i] = this._element.getBoundingClientRect()[i] + "px", s.reflow(this._element), e(this._element).addClass("collapsing").removeClass("collapse show");
          var o = this._triggerArray.length;
          if (o > 0) for (var r = 0; r < o; r++) {
            var a = this._triggerArray[r],
                l = s.getSelectorFromElement(a);
            if (null !== l) e([].slice.call(document.querySelectorAll(l))).hasClass("show") || e(a).addClass("collapsed").attr("aria-expanded", !1);
          }
          this.setTransitioning(!0);
          this._element.style[i] = "";
          var c = s.getTransitionDurationFromElement(this._element);
          e(this._element).one(s.TRANSITION_END, function () {
            t.setTransitioning(!1), e(t._element).removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
          }).emulateTransitionEnd(c);
        }
      }
    }, n.setTransitioning = function (t) {
      this._isTransitioning = t;
    }, n.dispose = function () {
      e.removeData(this._element, "bs.collapse"), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null;
    }, n._getConfig = function (t) {
      return (t = o({}, w, t)).toggle = Boolean(t.toggle), s.typeCheckConfig(b, t, E), t;
    }, n._getDimension = function () {
      return e(this._element).hasClass("width") ? "width" : "height";
    }, n._getParent = function () {
      var n,
          i = this;
      s.isElement(this._config.parent) ? (n = this._config.parent, "undefined" != typeof this._config.parent.jquery && (n = this._config.parent[0])) : n = document.querySelector(this._config.parent);
      var o = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]',
          r = [].slice.call(n.querySelectorAll(o));
      return e(r).each(function (e, n) {
        i._addAriaAndCollapsedClass(t._getTargetFromElement(n), [n]);
      }), n;
    }, n._addAriaAndCollapsedClass = function (t, n) {
      var i = e(t).hasClass("show");
      n.length && e(n).toggleClass("collapsed", !i).attr("aria-expanded", i);
    }, t._getTargetFromElement = function (t) {
      var e = s.getSelectorFromElement(t);
      return e ? document.querySelector(e) : null;
    }, t._jQueryInterface = function (n) {
      return this.each(function () {
        var i = e(this),
            r = i.data("bs.collapse"),
            s = o({}, w, i.data(), "object" == _typeof(n) && n ? n : {});

        if (!r && s.toggle && "string" == typeof n && /show|hide/.test(n) && (s.toggle = !1), r || (r = new t(this, s), i.data("bs.collapse", r)), "string" == typeof n) {
          if ("undefined" == typeof r[n]) throw new TypeError('No method named "' + n + '"');
          r[n]();
        }
      });
    }, i(t, null, [{
      key: "VERSION",
      get: function get() {
        return "4.5.2";
      }
    }, {
      key: "Default",
      get: function get() {
        return w;
      }
    }]), t;
  }();

  e(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (t) {
    "A" === t.currentTarget.tagName && t.preventDefault();
    var n = e(this),
        i = s.getSelectorFromElement(this),
        o = [].slice.call(document.querySelectorAll(i));
    e(o).each(function () {
      var t = e(this),
          i = t.data("bs.collapse") ? "toggle" : n.data();

      T._jQueryInterface.call(t, i);
    });
  }), e.fn[b] = T._jQueryInterface, e.fn[b].Constructor = T, e.fn[b].noConflict = function () {
    return e.fn[b] = y, T._jQueryInterface;
  };

  var C = "undefined" != typeof window && "undefined" != typeof document && "undefined" != typeof navigator,
      S = function () {
    for (var t = ["Edge", "Trident", "Firefox"], e = 0; e < t.length; e += 1) {
      if (C && navigator.userAgent.indexOf(t[e]) >= 0) return 1;
    }

    return 0;
  }();

  var D = C && window.Promise ? function (t) {
    var e = !1;
    return function () {
      e || (e = !0, window.Promise.resolve().then(function () {
        e = !1, t();
      }));
    };
  } : function (t) {
    var e = !1;
    return function () {
      e || (e = !0, setTimeout(function () {
        e = !1, t();
      }, S));
    };
  };

  function N(t) {
    return t && "[object Function]" === {}.toString.call(t);
  }

  function k(t, e) {
    if (1 !== t.nodeType) return [];
    var n = t.ownerDocument.defaultView.getComputedStyle(t, null);
    return e ? n[e] : n;
  }

  function A(t) {
    return "HTML" === t.nodeName ? t : t.parentNode || t.host;
  }

  function I(t) {
    if (!t) return document.body;

    switch (t.nodeName) {
      case "HTML":
      case "BODY":
        return t.ownerDocument.body;

      case "#document":
        return t.body;
    }

    var e = k(t),
        n = e.overflow,
        i = e.overflowX,
        o = e.overflowY;
    return /(auto|scroll|overlay)/.test(n + o + i) ? t : I(A(t));
  }

  function O(t) {
    return t && t.referenceNode ? t.referenceNode : t;
  }

  var x = C && !(!window.MSInputMethodContext || !document.documentMode),
      j = C && /MSIE 10/.test(navigator.userAgent);

  function L(t) {
    return 11 === t ? x : 10 === t ? j : x || j;
  }

  function P(t) {
    if (!t) return document.documentElement;

    for (var e = L(10) ? document.body : null, n = t.offsetParent || null; n === e && t.nextElementSibling;) {
      n = (t = t.nextElementSibling).offsetParent;
    }

    var i = n && n.nodeName;
    return i && "BODY" !== i && "HTML" !== i ? -1 !== ["TH", "TD", "TABLE"].indexOf(n.nodeName) && "static" === k(n, "position") ? P(n) : n : t ? t.ownerDocument.documentElement : document.documentElement;
  }

  function F(t) {
    return null !== t.parentNode ? F(t.parentNode) : t;
  }

  function R(t, e) {
    if (!(t && t.nodeType && e && e.nodeType)) return document.documentElement;
    var n = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING,
        i = n ? t : e,
        o = n ? e : t,
        r = document.createRange();
    r.setStart(i, 0), r.setEnd(o, 0);
    var s,
        a,
        l = r.commonAncestorContainer;
    if (t !== l && e !== l || i.contains(o)) return "BODY" === (a = (s = l).nodeName) || "HTML" !== a && P(s.firstElementChild) !== s ? P(l) : l;
    var c = F(t);
    return c.host ? R(c.host, e) : R(t, F(e).host);
  }

  function H(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "top",
        n = "top" === e ? "scrollTop" : "scrollLeft",
        i = t.nodeName;

    if ("BODY" === i || "HTML" === i) {
      var o = t.ownerDocument.documentElement,
          r = t.ownerDocument.scrollingElement || o;
      return r[n];
    }

    return t[n];
  }

  function M(t, e) {
    var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
        i = H(e, "top"),
        o = H(e, "left"),
        r = n ? -1 : 1;
    return t.top += i * r, t.bottom += i * r, t.left += o * r, t.right += o * r, t;
  }

  function B(t, e) {
    var n = "x" === e ? "Left" : "Top",
        i = "Left" === n ? "Right" : "Bottom";
    return parseFloat(t["border" + n + "Width"]) + parseFloat(t["border" + i + "Width"]);
  }

  function q(t, e, n, i) {
    return Math.max(e["offset" + t], e["scroll" + t], n["client" + t], n["offset" + t], n["scroll" + t], L(10) ? parseInt(n["offset" + t]) + parseInt(i["margin" + ("Height" === t ? "Top" : "Left")]) + parseInt(i["margin" + ("Height" === t ? "Bottom" : "Right")]) : 0);
  }

  function Q(t) {
    var e = t.body,
        n = t.documentElement,
        i = L(10) && getComputedStyle(n);
    return {
      height: q("Height", e, n, i),
      width: q("Width", e, n, i)
    };
  }

  var W = function W(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
  },
      U = function () {
    function t(t, e) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
      }
    }

    return function (e, n, i) {
      return n && t(e.prototype, n), i && t(e, i), e;
    };
  }(),
      V = function V(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : t[e] = n, t;
  },
      Y = Object.assign || function (t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];

      for (var i in n) {
        Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
      }
    }

    return t;
  };

  function z(t) {
    return Y({}, t, {
      right: t.left + t.width,
      bottom: t.top + t.height
    });
  }

  function X(t) {
    var e = {};

    try {
      if (L(10)) {
        e = t.getBoundingClientRect();
        var n = H(t, "top"),
            i = H(t, "left");
        e.top += n, e.left += i, e.bottom += n, e.right += i;
      } else e = t.getBoundingClientRect();
    } catch (t) {}

    var o = {
      left: e.left,
      top: e.top,
      width: e.right - e.left,
      height: e.bottom - e.top
    },
        r = "HTML" === t.nodeName ? Q(t.ownerDocument) : {},
        s = r.width || t.clientWidth || o.width,
        a = r.height || t.clientHeight || o.height,
        l = t.offsetWidth - s,
        c = t.offsetHeight - a;

    if (l || c) {
      var h = k(t);
      l -= B(h, "x"), c -= B(h, "y"), o.width -= l, o.height -= c;
    }

    return z(o);
  }

  function K(t, e) {
    var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
        i = L(10),
        o = "HTML" === e.nodeName,
        r = X(t),
        s = X(e),
        a = I(t),
        l = k(e),
        c = parseFloat(l.borderTopWidth),
        h = parseFloat(l.borderLeftWidth);
    n && o && (s.top = Math.max(s.top, 0), s.left = Math.max(s.left, 0));
    var u = z({
      top: r.top - s.top - c,
      left: r.left - s.left - h,
      width: r.width,
      height: r.height
    });

    if (u.marginTop = 0, u.marginLeft = 0, !i && o) {
      var f = parseFloat(l.marginTop),
          d = parseFloat(l.marginLeft);
      u.top -= c - f, u.bottom -= c - f, u.left -= h - d, u.right -= h - d, u.marginTop = f, u.marginLeft = d;
    }

    return (i && !n ? e.contains(a) : e === a && "BODY" !== a.nodeName) && (u = M(u, e)), u;
  }

  function G(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
        n = t.ownerDocument.documentElement,
        i = K(t, n),
        o = Math.max(n.clientWidth, window.innerWidth || 0),
        r = Math.max(n.clientHeight, window.innerHeight || 0),
        s = e ? 0 : H(n),
        a = e ? 0 : H(n, "left"),
        l = {
      top: s - i.top + i.marginTop,
      left: a - i.left + i.marginLeft,
      width: o,
      height: r
    };
    return z(l);
  }

  function $(t) {
    var e = t.nodeName;
    if ("BODY" === e || "HTML" === e) return !1;
    if ("fixed" === k(t, "position")) return !0;
    var n = A(t);
    return !!n && $(n);
  }

  function J(t) {
    if (!t || !t.parentElement || L()) return document.documentElement;

    for (var e = t.parentElement; e && "none" === k(e, "transform");) {
      e = e.parentElement;
    }

    return e || document.documentElement;
  }

  function Z(t, e, n, i) {
    var o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
        r = {
      top: 0,
      left: 0
    },
        s = o ? J(t) : R(t, O(e));
    if ("viewport" === i) r = G(s, o);else {
      var a = void 0;
      "scrollParent" === i ? "BODY" === (a = I(A(e))).nodeName && (a = t.ownerDocument.documentElement) : a = "window" === i ? t.ownerDocument.documentElement : i;
      var l = K(a, s, o);
      if ("HTML" !== a.nodeName || $(s)) r = l;else {
        var c = Q(t.ownerDocument),
            h = c.height,
            u = c.width;
        r.top += l.top - l.marginTop, r.bottom = h + l.top, r.left += l.left - l.marginLeft, r.right = u + l.left;
      }
    }
    var f = "number" == typeof (n = n || 0);
    return r.left += f ? n : n.left || 0, r.top += f ? n : n.top || 0, r.right -= f ? n : n.right || 0, r.bottom -= f ? n : n.bottom || 0, r;
  }

  function tt(t) {
    return t.width * t.height;
  }

  function et(t, e, n, i, o) {
    var r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
    if (-1 === t.indexOf("auto")) return t;
    var s = Z(n, i, r, o),
        a = {
      top: {
        width: s.width,
        height: e.top - s.top
      },
      right: {
        width: s.right - e.right,
        height: s.height
      },
      bottom: {
        width: s.width,
        height: s.bottom - e.bottom
      },
      left: {
        width: e.left - s.left,
        height: s.height
      }
    },
        l = Object.keys(a).map(function (t) {
      return Y({
        key: t
      }, a[t], {
        area: tt(a[t])
      });
    }).sort(function (t, e) {
      return e.area - t.area;
    }),
        c = l.filter(function (t) {
      var e = t.width,
          i = t.height;
      return e >= n.clientWidth && i >= n.clientHeight;
    }),
        h = c.length > 0 ? c[0].key : l[0].key,
        u = t.split("-")[1];
    return h + (u ? "-" + u : "");
  }

  function nt(t, e, n) {
    var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null,
        o = i ? J(e) : R(e, O(n));
    return K(n, o, i);
  }

  function it(t) {
    var e = t.ownerDocument.defaultView.getComputedStyle(t),
        n = parseFloat(e.marginTop || 0) + parseFloat(e.marginBottom || 0),
        i = parseFloat(e.marginLeft || 0) + parseFloat(e.marginRight || 0);
    return {
      width: t.offsetWidth + i,
      height: t.offsetHeight + n
    };
  }

  function ot(t) {
    var e = {
      left: "right",
      right: "left",
      bottom: "top",
      top: "bottom"
    };
    return t.replace(/left|right|bottom|top/g, function (t) {
      return e[t];
    });
  }

  function rt(t, e, n) {
    n = n.split("-")[0];
    var i = it(t),
        o = {
      width: i.width,
      height: i.height
    },
        r = -1 !== ["right", "left"].indexOf(n),
        s = r ? "top" : "left",
        a = r ? "left" : "top",
        l = r ? "height" : "width",
        c = r ? "width" : "height";
    return o[s] = e[s] + e[l] / 2 - i[l] / 2, o[a] = n === a ? e[a] - i[c] : e[ot(a)], o;
  }

  function st(t, e) {
    return Array.prototype.find ? t.find(e) : t.filter(e)[0];
  }

  function at(t, e, n) {
    return (void 0 === n ? t : t.slice(0, function (t, e, n) {
      if (Array.prototype.findIndex) return t.findIndex(function (t) {
        return t[e] === n;
      });
      var i = st(t, function (t) {
        return t[e] === n;
      });
      return t.indexOf(i);
    }(t, "name", n))).forEach(function (t) {
      t["function"] && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
      var n = t["function"] || t.fn;
      t.enabled && N(n) && (e.offsets.popper = z(e.offsets.popper), e.offsets.reference = z(e.offsets.reference), e = n(e, t));
    }), e;
  }

  function lt() {
    if (!this.state.isDestroyed) {
      var t = {
        instance: this,
        styles: {},
        arrowStyles: {},
        attributes: {},
        flipped: !1,
        offsets: {}
      };
      t.offsets.reference = nt(this.state, this.popper, this.reference, this.options.positionFixed), t.placement = et(this.options.placement, t.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), t.originalPlacement = t.placement, t.positionFixed = this.options.positionFixed, t.offsets.popper = rt(this.popper, t.offsets.reference, t.placement), t.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", t = at(this.modifiers, t), this.state.isCreated ? this.options.onUpdate(t) : (this.state.isCreated = !0, this.options.onCreate(t));
    }
  }

  function ct(t, e) {
    return t.some(function (t) {
      var n = t.name;
      return t.enabled && n === e;
    });
  }

  function ht(t) {
    for (var e = [!1, "ms", "Webkit", "Moz", "O"], n = t.charAt(0).toUpperCase() + t.slice(1), i = 0; i < e.length; i++) {
      var o = e[i],
          r = o ? "" + o + n : t;
      if ("undefined" != typeof document.body.style[r]) return r;
    }

    return null;
  }

  function ut() {
    return this.state.isDestroyed = !0, ct(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[ht("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this;
  }

  function ft(t) {
    var e = t.ownerDocument;
    return e ? e.defaultView : window;
  }

  function dt(t, e, n, i) {
    n.updateBound = i, ft(t).addEventListener("resize", n.updateBound, {
      passive: !0
    });
    var o = I(t);
    return function t(e, n, i, o) {
      var r = "BODY" === e.nodeName,
          s = r ? e.ownerDocument.defaultView : e;
      s.addEventListener(n, i, {
        passive: !0
      }), r || t(I(s.parentNode), n, i, o), o.push(s);
    }(o, "scroll", n.updateBound, n.scrollParents), n.scrollElement = o, n.eventsEnabled = !0, n;
  }

  function pt() {
    this.state.eventsEnabled || (this.state = dt(this.reference, this.options, this.state, this.scheduleUpdate));
  }

  function mt() {
    var t, e;
    this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = (t = this.reference, e = this.state, ft(t).removeEventListener("resize", e.updateBound), e.scrollParents.forEach(function (t) {
      t.removeEventListener("scroll", e.updateBound);
    }), e.updateBound = null, e.scrollParents = [], e.scrollElement = null, e.eventsEnabled = !1, e));
  }

  function gt(t) {
    return "" !== t && !isNaN(parseFloat(t)) && isFinite(t);
  }

  function _t(t, e) {
    Object.keys(e).forEach(function (n) {
      var i = "";
      -1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(n) && gt(e[n]) && (i = "px"), t.style[n] = e[n] + i;
    });
  }

  var vt = C && /Firefox/i.test(navigator.userAgent);

  function bt(t, e, n) {
    var i = st(t, function (t) {
      return t.name === e;
    }),
        o = !!i && t.some(function (t) {
      return t.name === n && t.enabled && t.order < i.order;
    });

    if (!o) {
      var r = "`" + e + "`",
          s = "`" + n + "`";
      console.warn(s + " modifier is required by " + r + " modifier in order to work, be sure to include it before " + r + "!");
    }

    return o;
  }

  var yt = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
      wt = yt.slice(3);

  function Et(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
        n = wt.indexOf(t),
        i = wt.slice(n + 1).concat(wt.slice(0, n));
    return e ? i.reverse() : i;
  }

  var Tt = "flip",
      Ct = "clockwise",
      St = "counterclockwise";

  function Dt(t, e, n, i) {
    var o = [0, 0],
        r = -1 !== ["right", "left"].indexOf(i),
        s = t.split(/(\+|\-)/).map(function (t) {
      return t.trim();
    }),
        a = s.indexOf(st(s, function (t) {
      return -1 !== t.search(/,|\s/);
    }));
    s[a] && -1 === s[a].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
    var l = /\s*,\s*|\s+/,
        c = -1 !== a ? [s.slice(0, a).concat([s[a].split(l)[0]]), [s[a].split(l)[1]].concat(s.slice(a + 1))] : [s];
    return (c = c.map(function (t, i) {
      var o = (1 === i ? !r : r) ? "height" : "width",
          s = !1;
      return t.reduce(function (t, e) {
        return "" === t[t.length - 1] && -1 !== ["+", "-"].indexOf(e) ? (t[t.length - 1] = e, s = !0, t) : s ? (t[t.length - 1] += e, s = !1, t) : t.concat(e);
      }, []).map(function (t) {
        return function (t, e, n, i) {
          var o = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
              r = +o[1],
              s = o[2];
          if (!r) return t;

          if (0 === s.indexOf("%")) {
            var a = void 0;

            switch (s) {
              case "%p":
                a = n;
                break;

              case "%":
              case "%r":
              default:
                a = i;
            }

            return z(a)[e] / 100 * r;
          }

          if ("vh" === s || "vw" === s) {
            return ("vh" === s ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * r;
          }

          return r;
        }(t, o, e, n);
      });
    })).forEach(function (t, e) {
      t.forEach(function (n, i) {
        gt(n) && (o[e] += n * ("-" === t[i - 1] ? -1 : 1));
      });
    }), o;
  }

  var Nt = {
    placement: "bottom",
    positionFixed: !1,
    eventsEnabled: !0,
    removeOnDestroy: !1,
    onCreate: function onCreate() {},
    onUpdate: function onUpdate() {},
    modifiers: {
      shift: {
        order: 100,
        enabled: !0,
        fn: function fn(t) {
          var e = t.placement,
              n = e.split("-")[0],
              i = e.split("-")[1];

          if (i) {
            var o = t.offsets,
                r = o.reference,
                s = o.popper,
                a = -1 !== ["bottom", "top"].indexOf(n),
                l = a ? "left" : "top",
                c = a ? "width" : "height",
                h = {
              start: V({}, l, r[l]),
              end: V({}, l, r[l] + r[c] - s[c])
            };
            t.offsets.popper = Y({}, s, h[i]);
          }

          return t;
        }
      },
      offset: {
        order: 200,
        enabled: !0,
        fn: function fn(t, e) {
          var n = e.offset,
              i = t.placement,
              o = t.offsets,
              r = o.popper,
              s = o.reference,
              a = i.split("-")[0],
              l = void 0;
          return l = gt(+n) ? [+n, 0] : Dt(n, r, s, a), "left" === a ? (r.top += l[0], r.left -= l[1]) : "right" === a ? (r.top += l[0], r.left += l[1]) : "top" === a ? (r.left += l[0], r.top -= l[1]) : "bottom" === a && (r.left += l[0], r.top += l[1]), t.popper = r, t;
        },
        offset: 0
      },
      preventOverflow: {
        order: 300,
        enabled: !0,
        fn: function fn(t, e) {
          var n = e.boundariesElement || P(t.instance.popper);
          t.instance.reference === n && (n = P(n));
          var i = ht("transform"),
              o = t.instance.popper.style,
              r = o.top,
              s = o.left,
              a = o[i];
          o.top = "", o.left = "", o[i] = "";
          var l = Z(t.instance.popper, t.instance.reference, e.padding, n, t.positionFixed);
          o.top = r, o.left = s, o[i] = a, e.boundaries = l;
          var c = e.priority,
              h = t.offsets.popper,
              u = {
            primary: function primary(t) {
              var n = h[t];
              return h[t] < l[t] && !e.escapeWithReference && (n = Math.max(h[t], l[t])), V({}, t, n);
            },
            secondary: function secondary(t) {
              var n = "right" === t ? "left" : "top",
                  i = h[n];
              return h[t] > l[t] && !e.escapeWithReference && (i = Math.min(h[n], l[t] - ("right" === t ? h.width : h.height))), V({}, n, i);
            }
          };
          return c.forEach(function (t) {
            var e = -1 !== ["left", "top"].indexOf(t) ? "primary" : "secondary";
            h = Y({}, h, u[e](t));
          }), t.offsets.popper = h, t;
        },
        priority: ["left", "right", "top", "bottom"],
        padding: 5,
        boundariesElement: "scrollParent"
      },
      keepTogether: {
        order: 400,
        enabled: !0,
        fn: function fn(t) {
          var e = t.offsets,
              n = e.popper,
              i = e.reference,
              o = t.placement.split("-")[0],
              r = Math.floor,
              s = -1 !== ["top", "bottom"].indexOf(o),
              a = s ? "right" : "bottom",
              l = s ? "left" : "top",
              c = s ? "width" : "height";
          return n[a] < r(i[l]) && (t.offsets.popper[l] = r(i[l]) - n[c]), n[l] > r(i[a]) && (t.offsets.popper[l] = r(i[a])), t;
        }
      },
      arrow: {
        order: 500,
        enabled: !0,
        fn: function fn(t, e) {
          var n;
          if (!bt(t.instance.modifiers, "arrow", "keepTogether")) return t;
          var i = e.element;

          if ("string" == typeof i) {
            if (!(i = t.instance.popper.querySelector(i))) return t;
          } else if (!t.instance.popper.contains(i)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), t;

          var o = t.placement.split("-")[0],
              r = t.offsets,
              s = r.popper,
              a = r.reference,
              l = -1 !== ["left", "right"].indexOf(o),
              c = l ? "height" : "width",
              h = l ? "Top" : "Left",
              u = h.toLowerCase(),
              f = l ? "left" : "top",
              d = l ? "bottom" : "right",
              p = it(i)[c];
          a[d] - p < s[u] && (t.offsets.popper[u] -= s[u] - (a[d] - p)), a[u] + p > s[d] && (t.offsets.popper[u] += a[u] + p - s[d]), t.offsets.popper = z(t.offsets.popper);

          var m = a[u] + a[c] / 2 - p / 2,
              g = k(t.instance.popper),
              _ = parseFloat(g["margin" + h]),
              v = parseFloat(g["border" + h + "Width"]),
              b = m - t.offsets.popper[u] - _ - v;

          return b = Math.max(Math.min(s[c] - p, b), 0), t.arrowElement = i, t.offsets.arrow = (V(n = {}, u, Math.round(b)), V(n, f, ""), n), t;
        },
        element: "[x-arrow]"
      },
      flip: {
        order: 600,
        enabled: !0,
        fn: function fn(t, e) {
          if (ct(t.instance.modifiers, "inner")) return t;
          if (t.flipped && t.placement === t.originalPlacement) return t;
          var n = Z(t.instance.popper, t.instance.reference, e.padding, e.boundariesElement, t.positionFixed),
              i = t.placement.split("-")[0],
              o = ot(i),
              r = t.placement.split("-")[1] || "",
              s = [];

          switch (e.behavior) {
            case Tt:
              s = [i, o];
              break;

            case Ct:
              s = Et(i);
              break;

            case St:
              s = Et(i, !0);
              break;

            default:
              s = e.behavior;
          }

          return s.forEach(function (a, l) {
            if (i !== a || s.length === l + 1) return t;
            i = t.placement.split("-")[0], o = ot(i);

            var c = t.offsets.popper,
                h = t.offsets.reference,
                u = Math.floor,
                f = "left" === i && u(c.right) > u(h.left) || "right" === i && u(c.left) < u(h.right) || "top" === i && u(c.bottom) > u(h.top) || "bottom" === i && u(c.top) < u(h.bottom),
                d = u(c.left) < u(n.left),
                p = u(c.right) > u(n.right),
                m = u(c.top) < u(n.top),
                g = u(c.bottom) > u(n.bottom),
                _ = "left" === i && d || "right" === i && p || "top" === i && m || "bottom" === i && g,
                v = -1 !== ["top", "bottom"].indexOf(i),
                b = !!e.flipVariations && (v && "start" === r && d || v && "end" === r && p || !v && "start" === r && m || !v && "end" === r && g),
                y = !!e.flipVariationsByContent && (v && "start" === r && p || v && "end" === r && d || !v && "start" === r && g || !v && "end" === r && m),
                w = b || y;

            (f || _ || w) && (t.flipped = !0, (f || _) && (i = s[l + 1]), w && (r = function (t) {
              return "end" === t ? "start" : "start" === t ? "end" : t;
            }(r)), t.placement = i + (r ? "-" + r : ""), t.offsets.popper = Y({}, t.offsets.popper, rt(t.instance.popper, t.offsets.reference, t.placement)), t = at(t.instance.modifiers, t, "flip"));
          }), t;
        },
        behavior: "flip",
        padding: 5,
        boundariesElement: "viewport",
        flipVariations: !1,
        flipVariationsByContent: !1
      },
      inner: {
        order: 700,
        enabled: !1,
        fn: function fn(t) {
          var e = t.placement,
              n = e.split("-")[0],
              i = t.offsets,
              o = i.popper,
              r = i.reference,
              s = -1 !== ["left", "right"].indexOf(n),
              a = -1 === ["top", "left"].indexOf(n);
          return o[s ? "left" : "top"] = r[n] - (a ? o[s ? "width" : "height"] : 0), t.placement = ot(e), t.offsets.popper = z(o), t;
        }
      },
      hide: {
        order: 800,
        enabled: !0,
        fn: function fn(t) {
          if (!bt(t.instance.modifiers, "hide", "preventOverflow")) return t;
          var e = t.offsets.reference,
              n = st(t.instance.modifiers, function (t) {
            return "preventOverflow" === t.name;
          }).boundaries;

          if (e.bottom < n.top || e.left > n.right || e.top > n.bottom || e.right < n.left) {
            if (!0 === t.hide) return t;
            t.hide = !0, t.attributes["x-out-of-boundaries"] = "";
          } else {
            if (!1 === t.hide) return t;
            t.hide = !1, t.attributes["x-out-of-boundaries"] = !1;
          }

          return t;
        }
      },
      computeStyle: {
        order: 850,
        enabled: !0,
        fn: function fn(t, e) {
          var n = e.x,
              i = e.y,
              o = t.offsets.popper,
              r = st(t.instance.modifiers, function (t) {
            return "applyStyle" === t.name;
          }).gpuAcceleration;
          void 0 !== r && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");

          var s = void 0 !== r ? r : e.gpuAcceleration,
              a = P(t.instance.popper),
              l = X(a),
              c = {
            position: o.position
          },
              h = function (t, e) {
            var n = t.offsets,
                i = n.popper,
                o = n.reference,
                r = Math.round,
                s = Math.floor,
                a = function a(t) {
              return t;
            },
                l = r(o.width),
                c = r(i.width),
                h = -1 !== ["left", "right"].indexOf(t.placement),
                u = -1 !== t.placement.indexOf("-"),
                f = e ? h || u || l % 2 == c % 2 ? r : s : a,
                d = e ? r : a;

            return {
              left: f(l % 2 == 1 && c % 2 == 1 && !u && e ? i.left - 1 : i.left),
              top: d(i.top),
              bottom: d(i.bottom),
              right: f(i.right)
            };
          }(t, window.devicePixelRatio < 2 || !vt),
              u = "bottom" === n ? "top" : "bottom",
              f = "right" === i ? "left" : "right",
              d = ht("transform"),
              p = void 0,
              m = void 0;

          if (m = "bottom" === u ? "HTML" === a.nodeName ? -a.clientHeight + h.bottom : -l.height + h.bottom : h.top, p = "right" === f ? "HTML" === a.nodeName ? -a.clientWidth + h.right : -l.width + h.right : h.left, s && d) c[d] = "translate3d(" + p + "px, " + m + "px, 0)", c[u] = 0, c[f] = 0, c.willChange = "transform";else {
            var g = "bottom" === u ? -1 : 1,
                _ = "right" === f ? -1 : 1;

            c[u] = m * g, c[f] = p * _, c.willChange = u + ", " + f;
          }
          var v = {
            "x-placement": t.placement
          };
          return t.attributes = Y({}, v, t.attributes), t.styles = Y({}, c, t.styles), t.arrowStyles = Y({}, t.offsets.arrow, t.arrowStyles), t;
        },
        gpuAcceleration: !0,
        x: "bottom",
        y: "right"
      },
      applyStyle: {
        order: 900,
        enabled: !0,
        fn: function fn(t) {
          var e, n;
          return _t(t.instance.popper, t.styles), e = t.instance.popper, n = t.attributes, Object.keys(n).forEach(function (t) {
            !1 !== n[t] ? e.setAttribute(t, n[t]) : e.removeAttribute(t);
          }), t.arrowElement && Object.keys(t.arrowStyles).length && _t(t.arrowElement, t.arrowStyles), t;
        },
        onLoad: function onLoad(t, e, n, i, o) {
          var r = nt(o, e, t, n.positionFixed),
              s = et(n.placement, r, e, t, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
          return e.setAttribute("x-placement", s), _t(e, {
            position: n.positionFixed ? "fixed" : "absolute"
          }), n;
        },
        gpuAcceleration: void 0
      }
    }
  },
      kt = function () {
    function t(e, n) {
      var i = this,
          o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
      W(this, t), this.scheduleUpdate = function () {
        return requestAnimationFrame(i.update);
      }, this.update = D(this.update.bind(this)), this.options = Y({}, t.Defaults, o), this.state = {
        isDestroyed: !1,
        isCreated: !1,
        scrollParents: []
      }, this.reference = e && e.jquery ? e[0] : e, this.popper = n && n.jquery ? n[0] : n, this.options.modifiers = {}, Object.keys(Y({}, t.Defaults.modifiers, o.modifiers)).forEach(function (e) {
        i.options.modifiers[e] = Y({}, t.Defaults.modifiers[e] || {}, o.modifiers ? o.modifiers[e] : {});
      }), this.modifiers = Object.keys(this.options.modifiers).map(function (t) {
        return Y({
          name: t
        }, i.options.modifiers[t]);
      }).sort(function (t, e) {
        return t.order - e.order;
      }), this.modifiers.forEach(function (t) {
        t.enabled && N(t.onLoad) && t.onLoad(i.reference, i.popper, i.options, t, i.state);
      }), this.update();
      var r = this.options.eventsEnabled;
      r && this.enableEventListeners(), this.state.eventsEnabled = r;
    }

    return U(t, [{
      key: "update",
      value: function value() {
        return lt.call(this);
      }
    }, {
      key: "destroy",
      value: function value() {
        return ut.call(this);
      }
    }, {
      key: "enableEventListeners",
      value: function value() {
        return pt.call(this);
      }
    }, {
      key: "disableEventListeners",
      value: function value() {
        return mt.call(this);
      }
    }]), t;
  }();

  kt.Utils = ("undefined" != typeof window ? window : global).PopperUtils, kt.placements = yt, kt.Defaults = Nt;

  var At = "dropdown",
      It = e.fn[At],
      Ot = new RegExp("38|40|27"),
      xt = {
    offset: 0,
    flip: !0,
    boundary: "scrollParent",
    reference: "toggle",
    display: "dynamic",
    popperConfig: null
  },
      jt = {
    offset: "(number|string|function)",
    flip: "boolean",
    boundary: "(string|element)",
    reference: "(string|element)",
    display: "string",
    popperConfig: "(null|object)"
  },
      Lt = function () {
    function t(t, e) {
      this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners();
    }

    var n = t.prototype;
    return n.toggle = function () {
      if (!this._element.disabled && !e(this._element).hasClass("disabled")) {
        var n = e(this._menu).hasClass("show");
        t._clearMenus(), n || this.show(!0);
      }
    }, n.show = function (n) {
      if (void 0 === n && (n = !1), !(this._element.disabled || e(this._element).hasClass("disabled") || e(this._menu).hasClass("show"))) {
        var i = {
          relatedTarget: this._element
        },
            o = e.Event("show.bs.dropdown", i),
            r = t._getParentFromElement(this._element);

        if (e(r).trigger(o), !o.isDefaultPrevented()) {
          if (!this._inNavbar && n) {
            if ("undefined" == typeof kt) throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");
            var a = this._element;
            "parent" === this._config.reference ? a = r : s.isElement(this._config.reference) && (a = this._config.reference, "undefined" != typeof this._config.reference.jquery && (a = this._config.reference[0])), "scrollParent" !== this._config.boundary && e(r).addClass("position-static"), this._popper = new kt(a, this._menu, this._getPopperConfig());
          }

          "ontouchstart" in document.documentElement && 0 === e(r).closest(".navbar-nav").length && e(document.body).children().on("mouseover", null, e.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), e(this._menu).toggleClass("show"), e(r).toggleClass("show").trigger(e.Event("shown.bs.dropdown", i));
        }
      }
    }, n.hide = function () {
      if (!this._element.disabled && !e(this._element).hasClass("disabled") && e(this._menu).hasClass("show")) {
        var n = {
          relatedTarget: this._element
        },
            i = e.Event("hide.bs.dropdown", n),
            o = t._getParentFromElement(this._element);

        e(o).trigger(i), i.isDefaultPrevented() || (this._popper && this._popper.destroy(), e(this._menu).toggleClass("show"), e(o).toggleClass("show").trigger(e.Event("hidden.bs.dropdown", n)));
      }
    }, n.dispose = function () {
      e.removeData(this._element, "bs.dropdown"), e(this._element).off(".bs.dropdown"), this._element = null, this._menu = null, null !== this._popper && (this._popper.destroy(), this._popper = null);
    }, n.update = function () {
      this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate();
    }, n._addEventListeners = function () {
      var t = this;
      e(this._element).on("click.bs.dropdown", function (e) {
        e.preventDefault(), e.stopPropagation(), t.toggle();
      });
    }, n._getConfig = function (t) {
      return t = o({}, this.constructor.Default, e(this._element).data(), t), s.typeCheckConfig(At, t, this.constructor.DefaultType), t;
    }, n._getMenuElement = function () {
      if (!this._menu) {
        var e = t._getParentFromElement(this._element);

        e && (this._menu = e.querySelector(".dropdown-menu"));
      }

      return this._menu;
    }, n._getPlacement = function () {
      var t = e(this._element.parentNode),
          n = "bottom-start";
      return t.hasClass("dropup") ? n = e(this._menu).hasClass("dropdown-menu-right") ? "top-end" : "top-start" : t.hasClass("dropright") ? n = "right-start" : t.hasClass("dropleft") ? n = "left-start" : e(this._menu).hasClass("dropdown-menu-right") && (n = "bottom-end"), n;
    }, n._detectNavbar = function () {
      return e(this._element).closest(".navbar").length > 0;
    }, n._getOffset = function () {
      var t = this,
          e = {};
      return "function" == typeof this._config.offset ? e.fn = function (e) {
        return e.offsets = o({}, e.offsets, t._config.offset(e.offsets, t._element) || {}), e;
      } : e.offset = this._config.offset, e;
    }, n._getPopperConfig = function () {
      var t = {
        placement: this._getPlacement(),
        modifiers: {
          offset: this._getOffset(),
          flip: {
            enabled: this._config.flip
          },
          preventOverflow: {
            boundariesElement: this._config.boundary
          }
        }
      };
      return "static" === this._config.display && (t.modifiers.applyStyle = {
        enabled: !1
      }), o({}, t, this._config.popperConfig);
    }, t._jQueryInterface = function (n) {
      return this.each(function () {
        var i = e(this).data("bs.dropdown");

        if (i || (i = new t(this, "object" == _typeof(n) ? n : null), e(this).data("bs.dropdown", i)), "string" == typeof n) {
          if ("undefined" == typeof i[n]) throw new TypeError('No method named "' + n + '"');
          i[n]();
        }
      });
    }, t._clearMenus = function (n) {
      if (!n || 3 !== n.which && ("keyup" !== n.type || 9 === n.which)) for (var i = [].slice.call(document.querySelectorAll('[data-toggle="dropdown"]')), o = 0, r = i.length; o < r; o++) {
        var s = t._getParentFromElement(i[o]),
            a = e(i[o]).data("bs.dropdown"),
            l = {
          relatedTarget: i[o]
        };

        if (n && "click" === n.type && (l.clickEvent = n), a) {
          var c = a._menu;

          if (e(s).hasClass("show") && !(n && ("click" === n.type && /input|textarea/i.test(n.target.tagName) || "keyup" === n.type && 9 === n.which) && e.contains(s, n.target))) {
            var h = e.Event("hide.bs.dropdown", l);
            e(s).trigger(h), h.isDefaultPrevented() || ("ontouchstart" in document.documentElement && e(document.body).children().off("mouseover", null, e.noop), i[o].setAttribute("aria-expanded", "false"), a._popper && a._popper.destroy(), e(c).removeClass("show"), e(s).removeClass("show").trigger(e.Event("hidden.bs.dropdown", l)));
          }
        }
      }
    }, t._getParentFromElement = function (t) {
      var e,
          n = s.getSelectorFromElement(t);
      return n && (e = document.querySelector(n)), e || t.parentNode;
    }, t._dataApiKeydownHandler = function (n) {
      if (!(/input|textarea/i.test(n.target.tagName) ? 32 === n.which || 27 !== n.which && (40 !== n.which && 38 !== n.which || e(n.target).closest(".dropdown-menu").length) : !Ot.test(n.which)) && !this.disabled && !e(this).hasClass("disabled")) {
        var i = t._getParentFromElement(this),
            o = e(i).hasClass("show");

        if (o || 27 !== n.which) {
          if (n.preventDefault(), n.stopPropagation(), !o || o && (27 === n.which || 32 === n.which)) return 27 === n.which && e(i.querySelector('[data-toggle="dropdown"]')).trigger("focus"), void e(this).trigger("click");
          var r = [].slice.call(i.querySelectorAll(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)")).filter(function (t) {
            return e(t).is(":visible");
          });

          if (0 !== r.length) {
            var s = r.indexOf(n.target);
            38 === n.which && s > 0 && s--, 40 === n.which && s < r.length - 1 && s++, s < 0 && (s = 0), r[s].focus();
          }
        }
      }
    }, i(t, null, [{
      key: "VERSION",
      get: function get() {
        return "4.5.2";
      }
    }, {
      key: "Default",
      get: function get() {
        return xt;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return jt;
      }
    }]), t;
  }();

  e(document).on("keydown.bs.dropdown.data-api", '[data-toggle="dropdown"]', Lt._dataApiKeydownHandler).on("keydown.bs.dropdown.data-api", ".dropdown-menu", Lt._dataApiKeydownHandler).on("click.bs.dropdown.data-api keyup.bs.dropdown.data-api", Lt._clearMenus).on("click.bs.dropdown.data-api", '[data-toggle="dropdown"]', function (t) {
    t.preventDefault(), t.stopPropagation(), Lt._jQueryInterface.call(e(this), "toggle");
  }).on("click.bs.dropdown.data-api", ".dropdown form", function (t) {
    t.stopPropagation();
  }), e.fn[At] = Lt._jQueryInterface, e.fn[At].Constructor = Lt, e.fn[At].noConflict = function () {
    return e.fn[At] = It, Lt._jQueryInterface;
  };

  var Pt = e.fn.modal,
      Ft = {
    backdrop: !0,
    keyboard: !0,
    focus: !0,
    show: !0
  },
      Rt = {
    backdrop: "(boolean|string)",
    keyboard: "boolean",
    focus: "boolean",
    show: "boolean"
  },
      Ht = function () {
    function t(t, e) {
      this._config = this._getConfig(e), this._element = t, this._dialog = t.querySelector(".modal-dialog"), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0;
    }

    var n = t.prototype;
    return n.toggle = function (t) {
      return this._isShown ? this.hide() : this.show(t);
    }, n.show = function (t) {
      var n = this;

      if (!this._isShown && !this._isTransitioning) {
        e(this._element).hasClass("fade") && (this._isTransitioning = !0);
        var i = e.Event("show.bs.modal", {
          relatedTarget: t
        });
        e(this._element).trigger(i), this._isShown || i.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), e(this._element).on("click.dismiss.bs.modal", '[data-dismiss="modal"]', function (t) {
          return n.hide(t);
        }), e(this._dialog).on("mousedown.dismiss.bs.modal", function () {
          e(n._element).one("mouseup.dismiss.bs.modal", function (t) {
            e(t.target).is(n._element) && (n._ignoreBackdropClick = !0);
          });
        }), this._showBackdrop(function () {
          return n._showElement(t);
        }));
      }
    }, n.hide = function (t) {
      var n = this;

      if (t && t.preventDefault(), this._isShown && !this._isTransitioning) {
        var i = e.Event("hide.bs.modal");

        if (e(this._element).trigger(i), this._isShown && !i.isDefaultPrevented()) {
          this._isShown = !1;
          var o = e(this._element).hasClass("fade");

          if (o && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), e(document).off("focusin.bs.modal"), e(this._element).removeClass("show"), e(this._element).off("click.dismiss.bs.modal"), e(this._dialog).off("mousedown.dismiss.bs.modal"), o) {
            var r = s.getTransitionDurationFromElement(this._element);
            e(this._element).one(s.TRANSITION_END, function (t) {
              return n._hideModal(t);
            }).emulateTransitionEnd(r);
          } else this._hideModal();
        }
      }
    }, n.dispose = function () {
      [window, this._element, this._dialog].forEach(function (t) {
        return e(t).off(".bs.modal");
      }), e(document).off("focusin.bs.modal"), e.removeData(this._element, "bs.modal"), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null;
    }, n.handleUpdate = function () {
      this._adjustDialog();
    }, n._getConfig = function (t) {
      return t = o({}, Ft, t), s.typeCheckConfig("modal", t, Rt), t;
    }, n._triggerBackdropTransition = function () {
      var t = this;

      if ("static" === this._config.backdrop) {
        var n = e.Event("hidePrevented.bs.modal");
        if (e(this._element).trigger(n), n.defaultPrevented) return;
        var i = this._element.scrollHeight > document.documentElement.clientHeight;
        i || (this._element.style.overflowY = "hidden"), this._element.classList.add("modal-static");
        var o = s.getTransitionDurationFromElement(this._dialog);
        e(this._element).off(s.TRANSITION_END), e(this._element).one(s.TRANSITION_END, function () {
          t._element.classList.remove("modal-static"), i || e(t._element).one(s.TRANSITION_END, function () {
            t._element.style.overflowY = "";
          }).emulateTransitionEnd(t._element, o);
        }).emulateTransitionEnd(o), this._element.focus();
      } else this.hide();
    }, n._showElement = function (t) {
      var n = this,
          i = e(this._element).hasClass("fade"),
          o = this._dialog ? this._dialog.querySelector(".modal-body") : null;
      this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), e(this._dialog).hasClass("modal-dialog-scrollable") && o ? o.scrollTop = 0 : this._element.scrollTop = 0, i && s.reflow(this._element), e(this._element).addClass("show"), this._config.focus && this._enforceFocus();

      var r = e.Event("shown.bs.modal", {
        relatedTarget: t
      }),
          a = function a() {
        n._config.focus && n._element.focus(), n._isTransitioning = !1, e(n._element).trigger(r);
      };

      if (i) {
        var l = s.getTransitionDurationFromElement(this._dialog);
        e(this._dialog).one(s.TRANSITION_END, a).emulateTransitionEnd(l);
      } else a();
    }, n._enforceFocus = function () {
      var t = this;
      e(document).off("focusin.bs.modal").on("focusin.bs.modal", function (n) {
        document !== n.target && t._element !== n.target && 0 === e(t._element).has(n.target).length && t._element.focus();
      });
    }, n._setEscapeEvent = function () {
      var t = this;
      this._isShown ? e(this._element).on("keydown.dismiss.bs.modal", function (e) {
        t._config.keyboard && 27 === e.which ? (e.preventDefault(), t.hide()) : t._config.keyboard || 27 !== e.which || t._triggerBackdropTransition();
      }) : this._isShown || e(this._element).off("keydown.dismiss.bs.modal");
    }, n._setResizeEvent = function () {
      var t = this;
      this._isShown ? e(window).on("resize.bs.modal", function (e) {
        return t.handleUpdate(e);
      }) : e(window).off("resize.bs.modal");
    }, n._hideModal = function () {
      var t = this;
      this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._showBackdrop(function () {
        e(document.body).removeClass("modal-open"), t._resetAdjustments(), t._resetScrollbar(), e(t._element).trigger("hidden.bs.modal");
      });
    }, n._removeBackdrop = function () {
      this._backdrop && (e(this._backdrop).remove(), this._backdrop = null);
    }, n._showBackdrop = function (t) {
      var n = this,
          i = e(this._element).hasClass("fade") ? "fade" : "";

      if (this._isShown && this._config.backdrop) {
        if (this._backdrop = document.createElement("div"), this._backdrop.className = "modal-backdrop", i && this._backdrop.classList.add(i), e(this._backdrop).appendTo(document.body), e(this._element).on("click.dismiss.bs.modal", function (t) {
          n._ignoreBackdropClick ? n._ignoreBackdropClick = !1 : t.target === t.currentTarget && n._triggerBackdropTransition();
        }), i && s.reflow(this._backdrop), e(this._backdrop).addClass("show"), !t) return;
        if (!i) return void t();
        var o = s.getTransitionDurationFromElement(this._backdrop);
        e(this._backdrop).one(s.TRANSITION_END, t).emulateTransitionEnd(o);
      } else if (!this._isShown && this._backdrop) {
        e(this._backdrop).removeClass("show");

        var r = function r() {
          n._removeBackdrop(), t && t();
        };

        if (e(this._element).hasClass("fade")) {
          var a = s.getTransitionDurationFromElement(this._backdrop);
          e(this._backdrop).one(s.TRANSITION_END, r).emulateTransitionEnd(a);
        } else r();
      } else t && t();
    }, n._adjustDialog = function () {
      var t = this._element.scrollHeight > document.documentElement.clientHeight;
      !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px");
    }, n._resetAdjustments = function () {
      this._element.style.paddingLeft = "", this._element.style.paddingRight = "";
    }, n._checkScrollbar = function () {
      var t = document.body.getBoundingClientRect();
      this._isBodyOverflowing = Math.round(t.left + t.right) < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth();
    }, n._setScrollbar = function () {
      var t = this;

      if (this._isBodyOverflowing) {
        var n = [].slice.call(document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top")),
            i = [].slice.call(document.querySelectorAll(".sticky-top"));
        e(n).each(function (n, i) {
          var o = i.style.paddingRight,
              r = e(i).css("padding-right");
          e(i).data("padding-right", o).css("padding-right", parseFloat(r) + t._scrollbarWidth + "px");
        }), e(i).each(function (n, i) {
          var o = i.style.marginRight,
              r = e(i).css("margin-right");
          e(i).data("margin-right", o).css("margin-right", parseFloat(r) - t._scrollbarWidth + "px");
        });
        var o = document.body.style.paddingRight,
            r = e(document.body).css("padding-right");
        e(document.body).data("padding-right", o).css("padding-right", parseFloat(r) + this._scrollbarWidth + "px");
      }

      e(document.body).addClass("modal-open");
    }, n._resetScrollbar = function () {
      var t = [].slice.call(document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"));
      e(t).each(function (t, n) {
        var i = e(n).data("padding-right");
        e(n).removeData("padding-right"), n.style.paddingRight = i || "";
      });
      var n = [].slice.call(document.querySelectorAll(".sticky-top"));
      e(n).each(function (t, n) {
        var i = e(n).data("margin-right");
        "undefined" != typeof i && e(n).css("margin-right", i).removeData("margin-right");
      });
      var i = e(document.body).data("padding-right");
      e(document.body).removeData("padding-right"), document.body.style.paddingRight = i || "";
    }, n._getScrollbarWidth = function () {
      var t = document.createElement("div");
      t.className = "modal-scrollbar-measure", document.body.appendChild(t);
      var e = t.getBoundingClientRect().width - t.clientWidth;
      return document.body.removeChild(t), e;
    }, t._jQueryInterface = function (n, i) {
      return this.each(function () {
        var r = e(this).data("bs.modal"),
            s = o({}, Ft, e(this).data(), "object" == _typeof(n) && n ? n : {});

        if (r || (r = new t(this, s), e(this).data("bs.modal", r)), "string" == typeof n) {
          if ("undefined" == typeof r[n]) throw new TypeError('No method named "' + n + '"');
          r[n](i);
        } else s.show && r.show(i);
      });
    }, i(t, null, [{
      key: "VERSION",
      get: function get() {
        return "4.5.2";
      }
    }, {
      key: "Default",
      get: function get() {
        return Ft;
      }
    }]), t;
  }();

  e(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (t) {
    var n,
        i = this,
        r = s.getSelectorFromElement(this);
    r && (n = document.querySelector(r));
    var a = e(n).data("bs.modal") ? "toggle" : o({}, e(n).data(), e(this).data());
    "A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault();
    var l = e(n).one("show.bs.modal", function (t) {
      t.isDefaultPrevented() || l.one("hidden.bs.modal", function () {
        e(i).is(":visible") && i.focus();
      });
    });

    Ht._jQueryInterface.call(e(n), a, this);
  }), e.fn.modal = Ht._jQueryInterface, e.fn.modal.Constructor = Ht, e.fn.modal.noConflict = function () {
    return e.fn.modal = Pt, Ht._jQueryInterface;
  };
  var Mt = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
      Bt = {
    "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
    a: ["target", "href", "title", "rel"],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ["src", "srcset", "alt", "title", "width", "height"],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  },
      qt = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi,
      Qt = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

  function Wt(t, e, n) {
    if (0 === t.length) return t;
    if (n && "function" == typeof n) return n(t);

    for (var i = new window.DOMParser().parseFromString(t, "text/html"), o = Object.keys(e), r = [].slice.call(i.body.querySelectorAll("*")), s = function s(t, n) {
      var i = r[t],
          s = i.nodeName.toLowerCase();
      if (-1 === o.indexOf(i.nodeName.toLowerCase())) return i.parentNode.removeChild(i), "continue";
      var a = [].slice.call(i.attributes),
          l = [].concat(e["*"] || [], e[s] || []);
      a.forEach(function (t) {
        (function (t, e) {
          var n = t.nodeName.toLowerCase();
          if (-1 !== e.indexOf(n)) return -1 === Mt.indexOf(n) || Boolean(t.nodeValue.match(qt) || t.nodeValue.match(Qt));

          for (var i = e.filter(function (t) {
            return t instanceof RegExp;
          }), o = 0, r = i.length; o < r; o++) {
            if (n.match(i[o])) return !0;
          }

          return !1;
        })(t, l) || i.removeAttribute(t.nodeName);
      });
    }, a = 0, l = r.length; a < l; a++) {
      s(a);
    }

    return i.body.innerHTML;
  }

  var Ut = "tooltip",
      Vt = e.fn[Ut],
      Yt = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
      zt = ["sanitize", "whiteList", "sanitizeFn"],
      Xt = {
    animation: "boolean",
    template: "string",
    title: "(string|element|function)",
    trigger: "string",
    delay: "(number|object)",
    html: "boolean",
    selector: "(string|boolean)",
    placement: "(string|function)",
    offset: "(number|string|function)",
    container: "(string|element|boolean)",
    fallbackPlacement: "(string|array)",
    boundary: "(string|element)",
    sanitize: "boolean",
    sanitizeFn: "(null|function)",
    whiteList: "object",
    popperConfig: "(null|object)"
  },
      Kt = {
    AUTO: "auto",
    TOP: "top",
    RIGHT: "right",
    BOTTOM: "bottom",
    LEFT: "left"
  },
      Gt = {
    animation: !0,
    template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: "hover focus",
    title: "",
    delay: 0,
    html: !1,
    selector: !1,
    placement: "top",
    offset: 0,
    container: !1,
    fallbackPlacement: "flip",
    boundary: "scrollParent",
    sanitize: !0,
    sanitizeFn: null,
    whiteList: Bt,
    popperConfig: null
  },
      $t = {
    HIDE: "hide.bs.tooltip",
    HIDDEN: "hidden.bs.tooltip",
    SHOW: "show.bs.tooltip",
    SHOWN: "shown.bs.tooltip",
    INSERTED: "inserted.bs.tooltip",
    CLICK: "click.bs.tooltip",
    FOCUSIN: "focusin.bs.tooltip",
    FOCUSOUT: "focusout.bs.tooltip",
    MOUSEENTER: "mouseenter.bs.tooltip",
    MOUSELEAVE: "mouseleave.bs.tooltip"
  },
      Jt = function () {
    function t(t, e) {
      if ("undefined" == typeof kt) throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");
      this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners();
    }

    var n = t.prototype;
    return n.enable = function () {
      this._isEnabled = !0;
    }, n.disable = function () {
      this._isEnabled = !1;
    }, n.toggleEnabled = function () {
      this._isEnabled = !this._isEnabled;
    }, n.toggle = function (t) {
      if (this._isEnabled) if (t) {
        var n = this.constructor.DATA_KEY,
            i = e(t.currentTarget).data(n);
        i || (i = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(n, i)), i._activeTrigger.click = !i._activeTrigger.click, i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i);
      } else {
        if (e(this.getTipElement()).hasClass("show")) return void this._leave(null, this);

        this._enter(null, this);
      }
    }, n.dispose = function () {
      clearTimeout(this._timeout), e.removeData(this.element, this.constructor.DATA_KEY), e(this.element).off(this.constructor.EVENT_KEY), e(this.element).closest(".modal").off("hide.bs.modal", this._hideModalHandler), this.tip && e(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null;
    }, n.show = function () {
      var t = this;
      if ("none" === e(this.element).css("display")) throw new Error("Please use show on visible elements");
      var n = e.Event(this.constructor.Event.SHOW);

      if (this.isWithContent() && this._isEnabled) {
        e(this.element).trigger(n);
        var i = s.findShadowRoot(this.element),
            o = e.contains(null !== i ? i : this.element.ownerDocument.documentElement, this.element);
        if (n.isDefaultPrevented() || !o) return;
        var r = this.getTipElement(),
            a = s.getUID(this.constructor.NAME);
        r.setAttribute("id", a), this.element.setAttribute("aria-describedby", a), this.setContent(), this.config.animation && e(r).addClass("fade");

        var l = "function" == typeof this.config.placement ? this.config.placement.call(this, r, this.element) : this.config.placement,
            c = this._getAttachment(l);

        this.addAttachmentClass(c);

        var h = this._getContainer();

        e(r).data(this.constructor.DATA_KEY, this), e.contains(this.element.ownerDocument.documentElement, this.tip) || e(r).appendTo(h), e(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new kt(this.element, r, this._getPopperConfig(c)), e(r).addClass("show"), "ontouchstart" in document.documentElement && e(document.body).children().on("mouseover", null, e.noop);

        var u = function u() {
          t.config.animation && t._fixTransition();
          var n = t._hoverState;
          t._hoverState = null, e(t.element).trigger(t.constructor.Event.SHOWN), "out" === n && t._leave(null, t);
        };

        if (e(this.tip).hasClass("fade")) {
          var f = s.getTransitionDurationFromElement(this.tip);
          e(this.tip).one(s.TRANSITION_END, u).emulateTransitionEnd(f);
        } else u();
      }
    }, n.hide = function (t) {
      var n = this,
          i = this.getTipElement(),
          o = e.Event(this.constructor.Event.HIDE),
          r = function r() {
        "show" !== n._hoverState && i.parentNode && i.parentNode.removeChild(i), n._cleanTipClass(), n.element.removeAttribute("aria-describedby"), e(n.element).trigger(n.constructor.Event.HIDDEN), null !== n._popper && n._popper.destroy(), t && t();
      };

      if (e(this.element).trigger(o), !o.isDefaultPrevented()) {
        if (e(i).removeClass("show"), "ontouchstart" in document.documentElement && e(document.body).children().off("mouseover", null, e.noop), this._activeTrigger.click = !1, this._activeTrigger.focus = !1, this._activeTrigger.hover = !1, e(this.tip).hasClass("fade")) {
          var a = s.getTransitionDurationFromElement(i);
          e(i).one(s.TRANSITION_END, r).emulateTransitionEnd(a);
        } else r();

        this._hoverState = "";
      }
    }, n.update = function () {
      null !== this._popper && this._popper.scheduleUpdate();
    }, n.isWithContent = function () {
      return Boolean(this.getTitle());
    }, n.addAttachmentClass = function (t) {
      e(this.getTipElement()).addClass("bs-tooltip-" + t);
    }, n.getTipElement = function () {
      return this.tip = this.tip || e(this.config.template)[0], this.tip;
    }, n.setContent = function () {
      var t = this.getTipElement();
      this.setElementContent(e(t.querySelectorAll(".tooltip-inner")), this.getTitle()), e(t).removeClass("fade show");
    }, n.setElementContent = function (t, n) {
      "object" != _typeof(n) || !n.nodeType && !n.jquery ? this.config.html ? (this.config.sanitize && (n = Wt(n, this.config.whiteList, this.config.sanitizeFn)), t.html(n)) : t.text(n) : this.config.html ? e(n).parent().is(t) || t.empty().append(n) : t.text(e(n).text());
    }, n.getTitle = function () {
      var t = this.element.getAttribute("data-original-title");
      return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t;
    }, n._getPopperConfig = function (t) {
      var e = this;
      return o({}, {
        placement: t,
        modifiers: {
          offset: this._getOffset(),
          flip: {
            behavior: this.config.fallbackPlacement
          },
          arrow: {
            element: ".arrow"
          },
          preventOverflow: {
            boundariesElement: this.config.boundary
          }
        },
        onCreate: function onCreate(t) {
          t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t);
        },
        onUpdate: function onUpdate(t) {
          return e._handlePopperPlacementChange(t);
        }
      }, this.config.popperConfig);
    }, n._getOffset = function () {
      var t = this,
          e = {};
      return "function" == typeof this.config.offset ? e.fn = function (e) {
        return e.offsets = o({}, e.offsets, t.config.offset(e.offsets, t.element) || {}), e;
      } : e.offset = this.config.offset, e;
    }, n._getContainer = function () {
      return !1 === this.config.container ? document.body : s.isElement(this.config.container) ? e(this.config.container) : e(document).find(this.config.container);
    }, n._getAttachment = function (t) {
      return Kt[t.toUpperCase()];
    }, n._setListeners = function () {
      var t = this;
      this.config.trigger.split(" ").forEach(function (n) {
        if ("click" === n) e(t.element).on(t.constructor.Event.CLICK, t.config.selector, function (e) {
          return t.toggle(e);
        });else if ("manual" !== n) {
          var i = "hover" === n ? t.constructor.Event.MOUSEENTER : t.constructor.Event.FOCUSIN,
              o = "hover" === n ? t.constructor.Event.MOUSELEAVE : t.constructor.Event.FOCUSOUT;
          e(t.element).on(i, t.config.selector, function (e) {
            return t._enter(e);
          }).on(o, t.config.selector, function (e) {
            return t._leave(e);
          });
        }
      }), this._hideModalHandler = function () {
        t.element && t.hide();
      }, e(this.element).closest(".modal").on("hide.bs.modal", this._hideModalHandler), this.config.selector ? this.config = o({}, this.config, {
        trigger: "manual",
        selector: ""
      }) : this._fixTitle();
    }, n._fixTitle = function () {
      var t = _typeof(this.element.getAttribute("data-original-title"));

      (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""));
    }, n._enter = function (t, n) {
      var i = this.constructor.DATA_KEY;
      (n = n || e(t.currentTarget).data(i)) || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(i, n)), t && (n._activeTrigger["focusin" === t.type ? "focus" : "hover"] = !0), e(n.getTipElement()).hasClass("show") || "show" === n._hoverState ? n._hoverState = "show" : (clearTimeout(n._timeout), n._hoverState = "show", n.config.delay && n.config.delay.show ? n._timeout = setTimeout(function () {
        "show" === n._hoverState && n.show();
      }, n.config.delay.show) : n.show());
    }, n._leave = function (t, n) {
      var i = this.constructor.DATA_KEY;
      (n = n || e(t.currentTarget).data(i)) || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(i, n)), t && (n._activeTrigger["focusout" === t.type ? "focus" : "hover"] = !1), n._isWithActiveTrigger() || (clearTimeout(n._timeout), n._hoverState = "out", n.config.delay && n.config.delay.hide ? n._timeout = setTimeout(function () {
        "out" === n._hoverState && n.hide();
      }, n.config.delay.hide) : n.hide());
    }, n._isWithActiveTrigger = function () {
      for (var t in this._activeTrigger) {
        if (this._activeTrigger[t]) return !0;
      }

      return !1;
    }, n._getConfig = function (t) {
      var n = e(this.element).data();
      return Object.keys(n).forEach(function (t) {
        -1 !== zt.indexOf(t) && delete n[t];
      }), "number" == typeof (t = o({}, this.constructor.Default, n, "object" == _typeof(t) && t ? t : {})).delay && (t.delay = {
        show: t.delay,
        hide: t.delay
      }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), s.typeCheckConfig(Ut, t, this.constructor.DefaultType), t.sanitize && (t.template = Wt(t.template, t.whiteList, t.sanitizeFn)), t;
    }, n._getDelegateConfig = function () {
      var t = {};
      if (this.config) for (var e in this.config) {
        this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
      }
      return t;
    }, n._cleanTipClass = function () {
      var t = e(this.getTipElement()),
          n = t.attr("class").match(Yt);
      null !== n && n.length && t.removeClass(n.join(""));
    }, n._handlePopperPlacementChange = function (t) {
      this.tip = t.instance.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement));
    }, n._fixTransition = function () {
      var t = this.getTipElement(),
          n = this.config.animation;
      null === t.getAttribute("x-placement") && (e(t).removeClass("fade"), this.config.animation = !1, this.hide(), this.show(), this.config.animation = n);
    }, t._jQueryInterface = function (n) {
      return this.each(function () {
        var i = e(this).data("bs.tooltip"),
            o = "object" == _typeof(n) && n;

        if ((i || !/dispose|hide/.test(n)) && (i || (i = new t(this, o), e(this).data("bs.tooltip", i)), "string" == typeof n)) {
          if ("undefined" == typeof i[n]) throw new TypeError('No method named "' + n + '"');
          i[n]();
        }
      });
    }, i(t, null, [{
      key: "VERSION",
      get: function get() {
        return "4.5.2";
      }
    }, {
      key: "Default",
      get: function get() {
        return Gt;
      }
    }, {
      key: "NAME",
      get: function get() {
        return Ut;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return "bs.tooltip";
      }
    }, {
      key: "Event",
      get: function get() {
        return $t;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return ".bs.tooltip";
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return Xt;
      }
    }]), t;
  }();

  e.fn[Ut] = Jt._jQueryInterface, e.fn[Ut].Constructor = Jt, e.fn[Ut].noConflict = function () {
    return e.fn[Ut] = Vt, Jt._jQueryInterface;
  };

  var Zt = "popover",
      te = e.fn[Zt],
      ee = new RegExp("(^|\\s)bs-popover\\S+", "g"),
      ne = o({}, Jt.Default, {
    placement: "right",
    trigger: "click",
    content: "",
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
  }),
      ie = o({}, Jt.DefaultType, {
    content: "(string|element|function)"
  }),
      oe = {
    HIDE: "hide.bs.popover",
    HIDDEN: "hidden.bs.popover",
    SHOW: "show.bs.popover",
    SHOWN: "shown.bs.popover",
    INSERTED: "inserted.bs.popover",
    CLICK: "click.bs.popover",
    FOCUSIN: "focusin.bs.popover",
    FOCUSOUT: "focusout.bs.popover",
    MOUSEENTER: "mouseenter.bs.popover",
    MOUSELEAVE: "mouseleave.bs.popover"
  },
      re = function (t) {
    var n, o;

    function r() {
      return t.apply(this, arguments) || this;
    }

    o = t, (n = r).prototype = Object.create(o.prototype), n.prototype.constructor = n, n.__proto__ = o;
    var s = r.prototype;
    return s.isWithContent = function () {
      return this.getTitle() || this._getContent();
    }, s.addAttachmentClass = function (t) {
      e(this.getTipElement()).addClass("bs-popover-" + t);
    }, s.getTipElement = function () {
      return this.tip = this.tip || e(this.config.template)[0], this.tip;
    }, s.setContent = function () {
      var t = e(this.getTipElement());
      this.setElementContent(t.find(".popover-header"), this.getTitle());

      var n = this._getContent();

      "function" == typeof n && (n = n.call(this.element)), this.setElementContent(t.find(".popover-body"), n), t.removeClass("fade show");
    }, s._getContent = function () {
      return this.element.getAttribute("data-content") || this.config.content;
    }, s._cleanTipClass = function () {
      var t = e(this.getTipElement()),
          n = t.attr("class").match(ee);
      null !== n && n.length > 0 && t.removeClass(n.join(""));
    }, r._jQueryInterface = function (t) {
      return this.each(function () {
        var n = e(this).data("bs.popover"),
            i = "object" == _typeof(t) ? t : null;

        if ((n || !/dispose|hide/.test(t)) && (n || (n = new r(this, i), e(this).data("bs.popover", n)), "string" == typeof t)) {
          if ("undefined" == typeof n[t]) throw new TypeError('No method named "' + t + '"');
          n[t]();
        }
      });
    }, i(r, null, [{
      key: "VERSION",
      get: function get() {
        return "4.5.2";
      }
    }, {
      key: "Default",
      get: function get() {
        return ne;
      }
    }, {
      key: "NAME",
      get: function get() {
        return Zt;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return "bs.popover";
      }
    }, {
      key: "Event",
      get: function get() {
        return oe;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return ".bs.popover";
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return ie;
      }
    }]), r;
  }(Jt);

  e.fn[Zt] = re._jQueryInterface, e.fn[Zt].Constructor = re, e.fn[Zt].noConflict = function () {
    return e.fn[Zt] = te, re._jQueryInterface;
  };

  var se = "scrollspy",
      ae = e.fn[se],
      le = {
    offset: 10,
    method: "auto",
    target: ""
  },
      ce = {
    offset: "number",
    method: "string",
    target: "(string|element)"
  },
      he = function () {
    function t(t, n) {
      var i = this;
      this._element = t, this._scrollElement = "BODY" === t.tagName ? window : t, this._config = this._getConfig(n), this._selector = this._config.target + " .nav-link," + this._config.target + " .list-group-item," + this._config.target + " .dropdown-item", this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, e(this._scrollElement).on("scroll.bs.scrollspy", function (t) {
        return i._process(t);
      }), this.refresh(), this._process();
    }

    var n = t.prototype;
    return n.refresh = function () {
      var t = this,
          n = this._scrollElement === this._scrollElement.window ? "offset" : "position",
          i = "auto" === this._config.method ? n : this._config.method,
          o = "position" === i ? this._getScrollTop() : 0;
      this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), [].slice.call(document.querySelectorAll(this._selector)).map(function (t) {
        var n,
            r = s.getSelectorFromElement(t);

        if (r && (n = document.querySelector(r)), n) {
          var a = n.getBoundingClientRect();
          if (a.width || a.height) return [e(n)[i]().top + o, r];
        }

        return null;
      }).filter(function (t) {
        return t;
      }).sort(function (t, e) {
        return t[0] - e[0];
      }).forEach(function (e) {
        t._offsets.push(e[0]), t._targets.push(e[1]);
      });
    }, n.dispose = function () {
      e.removeData(this._element, "bs.scrollspy"), e(this._scrollElement).off(".bs.scrollspy"), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null;
    }, n._getConfig = function (t) {
      if ("string" != typeof (t = o({}, le, "object" == _typeof(t) && t ? t : {})).target && s.isElement(t.target)) {
        var n = e(t.target).attr("id");
        n || (n = s.getUID(se), e(t.target).attr("id", n)), t.target = "#" + n;
      }

      return s.typeCheckConfig(se, t, ce), t;
    }, n._getScrollTop = function () {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    }, n._getScrollHeight = function () {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }, n._getOffsetHeight = function () {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    }, n._process = function () {
      var t = this._getScrollTop() + this._config.offset,
          e = this._getScrollHeight(),
          n = this._config.offset + e - this._getOffsetHeight();

      if (this._scrollHeight !== e && this.refresh(), t >= n) {
        var i = this._targets[this._targets.length - 1];
        this._activeTarget !== i && this._activate(i);
      } else {
        if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();

        for (var o = this._offsets.length; o--;) {
          this._activeTarget !== this._targets[o] && t >= this._offsets[o] && ("undefined" == typeof this._offsets[o + 1] || t < this._offsets[o + 1]) && this._activate(this._targets[o]);
        }
      }
    }, n._activate = function (t) {
      this._activeTarget = t, this._clear();

      var n = this._selector.split(",").map(function (e) {
        return e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]';
      }),
          i = e([].slice.call(document.querySelectorAll(n.join(","))));

      i.hasClass("dropdown-item") ? (i.closest(".dropdown").find(".dropdown-toggle").addClass("active"), i.addClass("active")) : (i.addClass("active"), i.parents(".nav, .list-group").prev(".nav-link, .list-group-item").addClass("active"), i.parents(".nav, .list-group").prev(".nav-item").children(".nav-link").addClass("active")), e(this._scrollElement).trigger("activate.bs.scrollspy", {
        relatedTarget: t
      });
    }, n._clear = function () {
      [].slice.call(document.querySelectorAll(this._selector)).filter(function (t) {
        return t.classList.contains("active");
      }).forEach(function (t) {
        return t.classList.remove("active");
      });
    }, t._jQueryInterface = function (n) {
      return this.each(function () {
        var i = e(this).data("bs.scrollspy");

        if (i || (i = new t(this, "object" == _typeof(n) && n), e(this).data("bs.scrollspy", i)), "string" == typeof n) {
          if ("undefined" == typeof i[n]) throw new TypeError('No method named "' + n + '"');
          i[n]();
        }
      });
    }, i(t, null, [{
      key: "VERSION",
      get: function get() {
        return "4.5.2";
      }
    }, {
      key: "Default",
      get: function get() {
        return le;
      }
    }]), t;
  }();

  e(window).on("load.bs.scrollspy.data-api", function () {
    for (var t = [].slice.call(document.querySelectorAll('[data-spy="scroll"]')), n = t.length; n--;) {
      var i = e(t[n]);

      he._jQueryInterface.call(i, i.data());
    }
  }), e.fn[se] = he._jQueryInterface, e.fn[se].Constructor = he, e.fn[se].noConflict = function () {
    return e.fn[se] = ae, he._jQueryInterface;
  };

  var ue = e.fn.tab,
      fe = function () {
    function t(t) {
      this._element = t;
    }

    var n = t.prototype;
    return n.show = function () {
      var t = this;

      if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && e(this._element).hasClass("active") || e(this._element).hasClass("disabled"))) {
        var n,
            i,
            o = e(this._element).closest(".nav, .list-group")[0],
            r = s.getSelectorFromElement(this._element);

        if (o) {
          var a = "UL" === o.nodeName || "OL" === o.nodeName ? "> li > .active" : ".active";
          i = (i = e.makeArray(e(o).find(a)))[i.length - 1];
        }

        var l = e.Event("hide.bs.tab", {
          relatedTarget: this._element
        }),
            c = e.Event("show.bs.tab", {
          relatedTarget: i
        });

        if (i && e(i).trigger(l), e(this._element).trigger(c), !c.isDefaultPrevented() && !l.isDefaultPrevented()) {
          r && (n = document.querySelector(r)), this._activate(this._element, o);

          var h = function h() {
            var n = e.Event("hidden.bs.tab", {
              relatedTarget: t._element
            }),
                o = e.Event("shown.bs.tab", {
              relatedTarget: i
            });
            e(i).trigger(n), e(t._element).trigger(o);
          };

          n ? this._activate(n, n.parentNode, h) : h();
        }
      }
    }, n.dispose = function () {
      e.removeData(this._element, "bs.tab"), this._element = null;
    }, n._activate = function (t, n, i) {
      var o = this,
          r = (!n || "UL" !== n.nodeName && "OL" !== n.nodeName ? e(n).children(".active") : e(n).find("> li > .active"))[0],
          a = i && r && e(r).hasClass("fade"),
          l = function l() {
        return o._transitionComplete(t, r, i);
      };

      if (r && a) {
        var c = s.getTransitionDurationFromElement(r);
        e(r).removeClass("show").one(s.TRANSITION_END, l).emulateTransitionEnd(c);
      } else l();
    }, n._transitionComplete = function (t, n, i) {
      if (n) {
        e(n).removeClass("active");
        var o = e(n.parentNode).find("> .dropdown-menu .active")[0];
        o && e(o).removeClass("active"), "tab" === n.getAttribute("role") && n.setAttribute("aria-selected", !1);
      }

      if (e(t).addClass("active"), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), s.reflow(t), t.classList.contains("fade") && t.classList.add("show"), t.parentNode && e(t.parentNode).hasClass("dropdown-menu")) {
        var r = e(t).closest(".dropdown")[0];

        if (r) {
          var a = [].slice.call(r.querySelectorAll(".dropdown-toggle"));
          e(a).addClass("active");
        }

        t.setAttribute("aria-expanded", !0);
      }

      i && i();
    }, t._jQueryInterface = function (n) {
      return this.each(function () {
        var i = e(this),
            o = i.data("bs.tab");

        if (o || (o = new t(this), i.data("bs.tab", o)), "string" == typeof n) {
          if ("undefined" == typeof o[n]) throw new TypeError('No method named "' + n + '"');
          o[n]();
        }
      });
    }, i(t, null, [{
      key: "VERSION",
      get: function get() {
        return "4.5.2";
      }
    }]), t;
  }();

  e(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', function (t) {
    t.preventDefault(), fe._jQueryInterface.call(e(this), "show");
  }), e.fn.tab = fe._jQueryInterface, e.fn.tab.Constructor = fe, e.fn.tab.noConflict = function () {
    return e.fn.tab = ue, fe._jQueryInterface;
  };

  var de = e.fn.toast,
      pe = {
    animation: "boolean",
    autohide: "boolean",
    delay: "number"
  },
      me = {
    animation: !0,
    autohide: !0,
    delay: 500
  },
      ge = function () {
    function t(t, e) {
      this._element = t, this._config = this._getConfig(e), this._timeout = null, this._setListeners();
    }

    var n = t.prototype;
    return n.show = function () {
      var t = this,
          n = e.Event("show.bs.toast");

      if (e(this._element).trigger(n), !n.isDefaultPrevented()) {
        this._clearTimeout(), this._config.animation && this._element.classList.add("fade");

        var i = function i() {
          t._element.classList.remove("showing"), t._element.classList.add("show"), e(t._element).trigger("shown.bs.toast"), t._config.autohide && (t._timeout = setTimeout(function () {
            t.hide();
          }, t._config.delay));
        };

        if (this._element.classList.remove("hide"), s.reflow(this._element), this._element.classList.add("showing"), this._config.animation) {
          var o = s.getTransitionDurationFromElement(this._element);
          e(this._element).one(s.TRANSITION_END, i).emulateTransitionEnd(o);
        } else i();
      }
    }, n.hide = function () {
      if (this._element.classList.contains("show")) {
        var t = e.Event("hide.bs.toast");
        e(this._element).trigger(t), t.isDefaultPrevented() || this._close();
      }
    }, n.dispose = function () {
      this._clearTimeout(), this._element.classList.contains("show") && this._element.classList.remove("show"), e(this._element).off("click.dismiss.bs.toast"), e.removeData(this._element, "bs.toast"), this._element = null, this._config = null;
    }, n._getConfig = function (t) {
      return t = o({}, me, e(this._element).data(), "object" == _typeof(t) && t ? t : {}), s.typeCheckConfig("toast", t, this.constructor.DefaultType), t;
    }, n._setListeners = function () {
      var t = this;
      e(this._element).on("click.dismiss.bs.toast", '[data-dismiss="toast"]', function () {
        return t.hide();
      });
    }, n._close = function () {
      var t = this,
          n = function n() {
        t._element.classList.add("hide"), e(t._element).trigger("hidden.bs.toast");
      };

      if (this._element.classList.remove("show"), this._config.animation) {
        var i = s.getTransitionDurationFromElement(this._element);
        e(this._element).one(s.TRANSITION_END, n).emulateTransitionEnd(i);
      } else n();
    }, n._clearTimeout = function () {
      clearTimeout(this._timeout), this._timeout = null;
    }, t._jQueryInterface = function (n) {
      return this.each(function () {
        var i = e(this),
            o = i.data("bs.toast");

        if (o || (o = new t(this, "object" == _typeof(n) && n), i.data("bs.toast", o)), "string" == typeof n) {
          if ("undefined" == typeof o[n]) throw new TypeError('No method named "' + n + '"');
          o[n](this);
        }
      });
    }, i(t, null, [{
      key: "VERSION",
      get: function get() {
        return "4.5.2";
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return pe;
      }
    }, {
      key: "Default",
      get: function get() {
        return me;
      }
    }]), t;
  }();

  e.fn.toast = ge._jQueryInterface, e.fn.toast.Constructor = ge, e.fn.toast.noConflict = function () {
    return e.fn.toast = de, ge._jQueryInterface;
  }, t.Alert = c, t.Button = u, t.Carousel = v, t.Collapse = T, t.Dropdown = Lt, t.Modal = Ht, t.Popover = re, t.Scrollspy = he, t.Tab = fe, t.Toast = ge, t.Tooltip = Jt, t.Util = s, Object.defineProperty(t, "__esModule", {
    value: !0
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./resources/templates/dashboard/AdminLTE/plugins/summernote/summernote.js":
/*!*********************************************************************************!*\
  !*** ./resources/templates/dashboard/AdminLTE/plugins/summernote/summernote.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery, module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof2(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

/*!
 * 
 * Super simple wysiwyg editor v0.8.18
 * https://summernote.org
 * 
 * 
 * Copyright 2013- Alan Hong. and other contributors
 * summernote may be freely distributed under the MIT license.
 * 
 * Date: 2020-05-20T16:47Z
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
  if (( false ? undefined : _typeof2(exports)) === 'object' && ( false ? undefined : _typeof2(module)) === 'object') module.exports = factory(__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"));else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else { var i, a; }
})(window, function (__WEBPACK_EXTERNAL_MODULE__0__) {
  return (
    /******/
    function (modules) {
      // webpackBootstrap

      /******/
      // The module cache

      /******/
      var installedModules = {};
      /******/

      /******/
      // The require function

      /******/

      function __webpack_require__(moduleId) {
        /******/

        /******/
        // Check if module is in cache

        /******/
        if (installedModules[moduleId]) {
          /******/
          return installedModules[moduleId].exports;
          /******/
        }
        /******/
        // Create a new module (and put it into the cache)

        /******/


        var module = installedModules[moduleId] = {
          /******/
          i: moduleId,

          /******/
          l: false,

          /******/
          exports: {}
          /******/

        };
        /******/

        /******/
        // Execute the module function

        /******/

        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/

        /******/
        // Flag the module as loaded

        /******/

        module.l = true;
        /******/

        /******/
        // Return the exports of the module

        /******/

        return module.exports;
        /******/
      }
      /******/

      /******/

      /******/
      // expose the modules object (__webpack_modules__)

      /******/


      __webpack_require__.m = modules;
      /******/

      /******/
      // expose the module cache

      /******/

      __webpack_require__.c = installedModules;
      /******/

      /******/
      // define getter function for harmony exports

      /******/

      __webpack_require__.d = function (exports, name, getter) {
        /******/
        if (!__webpack_require__.o(exports, name)) {
          /******/
          Object.defineProperty(exports, name, {
            enumerable: true,
            get: getter
          });
          /******/
        }
        /******/

      };
      /******/

      /******/
      // define __esModule on exports

      /******/


      __webpack_require__.r = function (exports) {
        /******/
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
          /******/
          Object.defineProperty(exports, Symbol.toStringTag, {
            value: 'Module'
          });
          /******/
        }
        /******/


        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        /******/
      };
      /******/

      /******/
      // create a fake namespace object

      /******/
      // mode & 1: value is a module id, require it

      /******/
      // mode & 2: merge all properties of value into the ns

      /******/
      // mode & 4: return value when already ns object

      /******/
      // mode & 8|1: behave like require

      /******/


      __webpack_require__.t = function (value, mode) {
        /******/
        if (mode & 1) value = __webpack_require__(value);
        /******/

        if (mode & 8) return value;
        /******/

        if (mode & 4 && _typeof2(value) === 'object' && value && value.__esModule) return value;
        /******/

        var ns = Object.create(null);
        /******/

        __webpack_require__.r(ns);
        /******/


        Object.defineProperty(ns, 'default', {
          enumerable: true,
          value: value
        });
        /******/

        if (mode & 2 && typeof value != 'string') for (var key in value) {
          __webpack_require__.d(ns, key, function (key) {
            return value[key];
          }.bind(null, key));
        }
        /******/

        return ns;
        /******/
      };
      /******/

      /******/
      // getDefaultExport function for compatibility with non-harmony modules

      /******/


      __webpack_require__.n = function (module) {
        /******/
        var getter = module && module.__esModule ?
        /******/
        function getDefault() {
          return module['default'];
        } :
        /******/
        function getModuleExports() {
          return module;
        };
        /******/

        __webpack_require__.d(getter, 'a', getter);
        /******/


        return getter;
        /******/
      };
      /******/

      /******/
      // Object.prototype.hasOwnProperty.call

      /******/


      __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/

      /******/
      // __webpack_public_path__

      /******/


      __webpack_require__.p = "";
      /******/

      /******/

      /******/
      // Load entry module and return exports

      /******/

      return __webpack_require__(__webpack_require__.s = 52);
      /******/
    }(
    /************************************************************************/

    /******/
    {
      /***/
      0:
      /***/
      function _(module, exports) {
        module.exports = __WEBPACK_EXTERNAL_MODULE__0__;
        /***/
      },

      /***/
      1:
      /***/
      function _(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */

        var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

        function _typeof(obj) {
          "@babel/helpers - typeof";

          if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
            _typeof = function _typeof(obj) {
              return typeof obj;
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
          }

          return _typeof(obj);
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        var Renderer = /*#__PURE__*/function () {
          function Renderer(markup, children, options, callback) {
            _classCallCheck(this, Renderer);

            this.markup = markup;
            this.children = children;
            this.options = options;
            this.callback = callback;
          }

          _createClass(Renderer, [{
            key: "render",
            value: function render($parent) {
              var $node = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.markup);

              if (this.options && this.options.contents) {
                $node.html(this.options.contents);
              }

              if (this.options && this.options.className) {
                $node.addClass(this.options.className);
              }

              if (this.options && this.options.data) {
                jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each(this.options.data, function (k, v) {
                  $node.attr('data-' + k, v);
                });
              }

              if (this.options && this.options.click) {
                $node.on('click', this.options.click);
              }

              if (this.children) {
                var $container = $node.find('.note-children-container');
                this.children.forEach(function (child) {
                  child.render($container.length ? $container : $node);
                });
              }

              if (this.callback) {
                this.callback($node, this.options);
              }

              if (this.options && this.options.callback) {
                this.options.callback($node);
              }

              if ($parent) {
                $parent.append($node);
              }

              return $node;
            }
          }]);

          return Renderer;
        }();
        /* harmony default export */


        __webpack_exports__["a"] = {
          create: function create(markup, callback) {
            return function () {
              var options = _typeof(arguments[1]) === 'object' ? arguments[1] : arguments[0];
              var children = Array.isArray(arguments[0]) ? arguments[0] : [];

              if (options && options.children) {
                children = options.children;
              }

              return new Renderer(markup, children, options, callback);
            };
          }
        };
        /***/
      },

      /***/
      2:
      /***/
      function _(module, exports) {
        /* WEBPACK VAR INJECTION */
        (function (__webpack_amd_options__) {
          /* globals __webpack_amd_options__ */
          module.exports = __webpack_amd_options__;
          /* WEBPACK VAR INJECTION */
        }).call(this, {});
        /***/
      },

      /***/
      3:
      /***/
      function _(module, __webpack_exports__, __webpack_require__) {
        "use strict"; // EXTERNAL MODULE: external {"root":"jQuery","commonjs2":"jquery","commonjs":"jquery","amd":"jquery"}

        var external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_ = __webpack_require__(0);

        var external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default = /*#__PURE__*/__webpack_require__.n(external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_); // CONCATENATED MODULE: ./src/js/base/summernote-en-US.js


        external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.summernote = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.summernote || {
          lang: {}
        };
        external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.extend(external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.summernote.lang, {
          'en-US': {
            font: {
              bold: 'Bold',
              italic: 'Italic',
              underline: 'Underline',
              clear: 'Remove Font Style',
              height: 'Line Height',
              name: 'Font Family',
              strikethrough: 'Strikethrough',
              subscript: 'Subscript',
              superscript: 'Superscript',
              size: 'Font Size',
              sizeunit: 'Font Size Unit'
            },
            image: {
              image: 'Picture',
              insert: 'Insert Image',
              resizeFull: 'Resize full',
              resizeHalf: 'Resize half',
              resizeQuarter: 'Resize quarter',
              resizeNone: 'Original size',
              floatLeft: 'Float Left',
              floatRight: 'Float Right',
              floatNone: 'Remove float',
              shapeRounded: 'Shape: Rounded',
              shapeCircle: 'Shape: Circle',
              shapeThumbnail: 'Shape: Thumbnail',
              shapeNone: 'Shape: None',
              dragImageHere: 'Drag image or text here',
              dropImage: 'Drop image or Text',
              selectFromFiles: 'Select from files',
              maximumFileSize: 'Maximum file size',
              maximumFileSizeError: 'Maximum file size exceeded.',
              url: 'Image URL',
              remove: 'Remove Image',
              original: 'Original'
            },
            video: {
              video: 'Video',
              videoLink: 'Video Link',
              insert: 'Insert Video',
              url: 'Video URL',
              providers: '(YouTube, Vimeo, Vine, Instagram, DailyMotion or Youku)'
            },
            link: {
              link: 'Link',
              insert: 'Insert Link',
              unlink: 'Unlink',
              edit: 'Edit',
              textToDisplay: 'Text to display',
              url: 'To what URL should this link go?',
              openInNewWindow: 'Open in new window',
              useProtocol: 'Use default protocol'
            },
            table: {
              table: 'Table',
              addRowAbove: 'Add row above',
              addRowBelow: 'Add row below',
              addColLeft: 'Add column left',
              addColRight: 'Add column right',
              delRow: 'Delete row',
              delCol: 'Delete column',
              delTable: 'Delete table'
            },
            hr: {
              insert: 'Insert Horizontal Rule'
            },
            style: {
              style: 'Style',
              p: 'Normal',
              blockquote: 'Quote',
              pre: 'Code',
              h1: 'Header 1',
              h2: 'Header 2',
              h3: 'Header 3',
              h4: 'Header 4',
              h5: 'Header 5',
              h6: 'Header 6'
            },
            lists: {
              unordered: 'Unordered list',
              ordered: 'Ordered list'
            },
            options: {
              help: 'Help',
              fullscreen: 'Full Screen',
              codeview: 'Code View'
            },
            paragraph: {
              paragraph: 'Paragraph',
              outdent: 'Outdent',
              indent: 'Indent',
              left: 'Align left',
              center: 'Align center',
              right: 'Align right',
              justify: 'Justify full'
            },
            color: {
              recent: 'Recent Color',
              more: 'More Color',
              background: 'Background Color',
              foreground: 'Text Color',
              transparent: 'Transparent',
              setTransparent: 'Set transparent',
              reset: 'Reset',
              resetToDefault: 'Reset to default',
              cpSelect: 'Select'
            },
            shortcut: {
              shortcuts: 'Keyboard shortcuts',
              close: 'Close',
              textFormatting: 'Text formatting',
              action: 'Action',
              paragraphFormatting: 'Paragraph formatting',
              documentStyle: 'Document Style',
              extraKeys: 'Extra keys'
            },
            help: {
              'escape': 'Escape',
              'insertParagraph': 'Insert Paragraph',
              'undo': 'Undo the last command',
              'redo': 'Redo the last command',
              'tab': 'Tab',
              'untab': 'Untab',
              'bold': 'Set a bold style',
              'italic': 'Set a italic style',
              'underline': 'Set a underline style',
              'strikethrough': 'Set a strikethrough style',
              'removeFormat': 'Clean a style',
              'justifyLeft': 'Set left align',
              'justifyCenter': 'Set center align',
              'justifyRight': 'Set right align',
              'justifyFull': 'Set full align',
              'insertUnorderedList': 'Toggle unordered list',
              'insertOrderedList': 'Toggle ordered list',
              'outdent': 'Outdent on current paragraph',
              'indent': 'Indent on current paragraph',
              'formatPara': 'Change current block\'s format as a paragraph(P tag)',
              'formatH1': 'Change current block\'s format as H1',
              'formatH2': 'Change current block\'s format as H2',
              'formatH3': 'Change current block\'s format as H3',
              'formatH4': 'Change current block\'s format as H4',
              'formatH5': 'Change current block\'s format as H5',
              'formatH6': 'Change current block\'s format as H6',
              'insertHorizontalRule': 'Insert horizontal rule',
              'linkDialog.show': 'Show Link Dialog'
            },
            history: {
              undo: 'Undo',
              redo: 'Redo'
            },
            specialChar: {
              specialChar: 'SPECIAL CHARACTERS',
              select: 'Select Special characters'
            },
            output: {
              noSelection: 'No Selection Made!'
            }
          }
        }); // CONCATENATED MODULE: ./src/js/base/core/env.js

        var isSupportAmd =  true && __webpack_require__(2); // eslint-disable-line

        /**
         * returns whether font is installed or not.
         *
         * @param {String} fontName
         * @return {Boolean}
         */


        var genericFontFamilies = ['sans-serif', 'serif', 'monospace', 'cursive', 'fantasy'];

        function validFontName(fontName) {
          return external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.inArray(fontName.toLowerCase(), genericFontFamilies) === -1 ? "'".concat(fontName, "'") : fontName;
        }

        function env_isFontInstalled(fontName) {
          var testFontName = fontName === 'Comic Sans MS' ? 'Courier New' : 'Comic Sans MS';
          var testText = 'mmmmmmmmmmwwwww';
          var testSize = '200px';
          var canvas = document.createElement('canvas');
          var context = canvas.getContext('2d');
          context.font = testSize + " '" + testFontName + "'";
          var originalWidth = context.measureText(testText).width;
          context.font = testSize + ' ' + validFontName(fontName) + ', "' + testFontName + '"';
          var width = context.measureText(testText).width;
          return originalWidth !== width;
        }

        var userAgent = navigator.userAgent;
        var isMSIE = /MSIE|Trident/i.test(userAgent);
        var browserVersion;

        if (isMSIE) {
          var matches = /MSIE (\d+[.]\d+)/.exec(userAgent);

          if (matches) {
            browserVersion = parseFloat(matches[1]);
          }

          matches = /Trident\/.*rv:([0-9]{1,}[.0-9]{0,})/.exec(userAgent);

          if (matches) {
            browserVersion = parseFloat(matches[1]);
          }
        }

        var isEdge = /Edge\/\d+/.test(userAgent);
        var isSupportTouch = 'ontouchstart' in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0; // [workaround] IE doesn't have input events for contentEditable
        // - see: https://goo.gl/4bfIvA

        var inputEventName = isMSIE ? 'DOMCharacterDataModified DOMSubtreeModified DOMNodeInserted' : 'input';
        /**
         * @class core.env
         *
         * Object which check platform and agent
         *
         * @singleton
         * @alternateClassName env
         */

        /* harmony default export */

        var env = {
          isMac: navigator.appVersion.indexOf('Mac') > -1,
          isMSIE: isMSIE,
          isEdge: isEdge,
          isFF: !isEdge && /firefox/i.test(userAgent),
          isPhantom: /PhantomJS/i.test(userAgent),
          isWebkit: !isEdge && /webkit/i.test(userAgent),
          isChrome: !isEdge && /chrome/i.test(userAgent),
          isSafari: !isEdge && /safari/i.test(userAgent) && !/chrome/i.test(userAgent),
          browserVersion: browserVersion,
          jqueryVersion: parseFloat(external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.fn.jquery),
          isSupportAmd: isSupportAmd,
          isSupportTouch: isSupportTouch,
          isFontInstalled: env_isFontInstalled,
          isW3CRangeSupport: !!document.createRange,
          inputEventName: inputEventName,
          genericFontFamilies: genericFontFamilies,
          validFontName: validFontName
        }; // CONCATENATED MODULE: ./src/js/base/core/func.js

        /**
         * @class core.func
         *
         * func utils (for high-order func's arg)
         *
         * @singleton
         * @alternateClassName func
         */

        function eq(itemA) {
          return function (itemB) {
            return itemA === itemB;
          };
        }

        function eq2(itemA, itemB) {
          return itemA === itemB;
        }

        function peq2(propName) {
          return function (itemA, itemB) {
            return itemA[propName] === itemB[propName];
          };
        }

        function ok() {
          return true;
        }

        function fail() {
          return false;
        }

        function not(f) {
          return function () {
            return !f.apply(f, arguments);
          };
        }

        function and(fA, fB) {
          return function (item) {
            return fA(item) && fB(item);
          };
        }

        function func_self(a) {
          return a;
        }

        function func_invoke(obj, method) {
          return function () {
            return obj[method].apply(obj, arguments);
          };
        }

        var idCounter = 0;
        /**
         * reset globally-unique id
         *
         */

        function resetUniqueId() {
          idCounter = 0;
        }
        /**
         * generate a globally-unique id
         *
         * @param {String} [prefix]
         */


        function uniqueId(prefix) {
          var id = ++idCounter + '';
          return prefix ? prefix + id : id;
        }
        /**
         * returns bnd (bounds) from rect
         *
         * - IE Compatibility Issue: http://goo.gl/sRLOAo
         * - Scroll Issue: http://goo.gl/sNjUc
         *
         * @param {Rect} rect
         * @return {Object} bounds
         * @return {Number} bounds.top
         * @return {Number} bounds.left
         * @return {Number} bounds.width
         * @return {Number} bounds.height
         */


        function rect2bnd(rect) {
          var $document = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(document);
          return {
            top: rect.top + $document.scrollTop(),
            left: rect.left + $document.scrollLeft(),
            width: rect.right - rect.left,
            height: rect.bottom - rect.top
          };
        }
        /**
         * returns a copy of the object where the keys have become the values and the values the keys.
         * @param {Object} obj
         * @return {Object}
         */


        function invertObject(obj) {
          var inverted = {};

          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              inverted[obj[key]] = key;
            }
          }

          return inverted;
        }
        /**
         * @param {String} namespace
         * @param {String} [prefix]
         * @return {String}
         */


        function namespaceToCamel(namespace, prefix) {
          prefix = prefix || '';
          return prefix + namespace.split('.').map(function (name) {
            return name.substring(0, 1).toUpperCase() + name.substring(1);
          }).join('');
        }
        /**
         * Returns a function, that, as long as it continues to be invoked, will not
         * be triggered. The function will be called after it stops being called for
         * N milliseconds. If `immediate` is passed, trigger the function on the
         * leading edge, instead of the trailing.
         * @param {Function} func
         * @param {Number} wait
         * @param {Boolean} immediate
         * @return {Function}
         */


        function debounce(func, wait, immediate) {
          var timeout;
          return function () {
            var context = this;
            var args = arguments;

            var later = function later() {
              timeout = null;

              if (!immediate) {
                func.apply(context, args);
              }
            };

            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);

            if (callNow) {
              func.apply(context, args);
            }
          };
        }
        /**
         *
         * @param {String} url
         * @return {Boolean}
         */


        function isValidUrl(url) {
          var expression = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
          return expression.test(url);
        }
        /* harmony default export */


        var func = {
          eq: eq,
          eq2: eq2,
          peq2: peq2,
          ok: ok,
          fail: fail,
          self: func_self,
          not: not,
          and: and,
          invoke: func_invoke,
          resetUniqueId: resetUniqueId,
          uniqueId: uniqueId,
          rect2bnd: rect2bnd,
          invertObject: invertObject,
          namespaceToCamel: namespaceToCamel,
          debounce: debounce,
          isValidUrl: isValidUrl
        }; // CONCATENATED MODULE: ./src/js/base/core/lists.js

        /**
         * returns the first item of an array.
         *
         * @param {Array} array
         */

        function lists_head(array) {
          return array[0];
        }
        /**
         * returns the last item of an array.
         *
         * @param {Array} array
         */


        function lists_last(array) {
          return array[array.length - 1];
        }
        /**
         * returns everything but the last entry of the array.
         *
         * @param {Array} array
         */


        function initial(array) {
          return array.slice(0, array.length - 1);
        }
        /**
         * returns the rest of the items in an array.
         *
         * @param {Array} array
         */


        function tail(array) {
          return array.slice(1);
        }
        /**
         * returns item of array
         */


        function find(array, pred) {
          for (var idx = 0, len = array.length; idx < len; idx++) {
            var item = array[idx];

            if (pred(item)) {
              return item;
            }
          }
        }
        /**
         * returns true if all of the values in the array pass the predicate truth test.
         */


        function lists_all(array, pred) {
          for (var idx = 0, len = array.length; idx < len; idx++) {
            if (!pred(array[idx])) {
              return false;
            }
          }

          return true;
        }
        /**
         * returns true if the value is present in the list.
         */


        function contains(array, item) {
          if (array && array.length && item) {
            if (array.indexOf) {
              return array.indexOf(item) !== -1;
            } else if (array.contains) {
              // `DOMTokenList` doesn't implement `.indexOf`, but it implements `.contains`
              return array.contains(item);
            }
          }

          return false;
        }
        /**
         * get sum from a list
         *
         * @param {Array} array - array
         * @param {Function} fn - iterator
         */


        function sum(array, fn) {
          fn = fn || func.self;
          return array.reduce(function (memo, v) {
            return memo + fn(v);
          }, 0);
        }
        /**
         * returns a copy of the collection with array type.
         * @param {Collection} collection - collection eg) node.childNodes, ...
         */


        function from(collection) {
          var result = [];
          var length = collection.length;
          var idx = -1;

          while (++idx < length) {
            result[idx] = collection[idx];
          }

          return result;
        }
        /**
         * returns whether list is empty or not
         */


        function lists_isEmpty(array) {
          return !array || !array.length;
        }
        /**
         * cluster elements by predicate function.
         *
         * @param {Array} array - array
         * @param {Function} fn - predicate function for cluster rule
         * @param {Array[]}
         */


        function clusterBy(array, fn) {
          if (!array.length) {
            return [];
          }

          var aTail = tail(array);
          return aTail.reduce(function (memo, v) {
            var aLast = lists_last(memo);

            if (fn(lists_last(aLast), v)) {
              aLast[aLast.length] = v;
            } else {
              memo[memo.length] = [v];
            }

            return memo;
          }, [[lists_head(array)]]);
        }
        /**
         * returns a copy of the array with all false values removed
         *
         * @param {Array} array - array
         * @param {Function} fn - predicate function for cluster rule
         */


        function compact(array) {
          var aResult = [];

          for (var idx = 0, len = array.length; idx < len; idx++) {
            if (array[idx]) {
              aResult.push(array[idx]);
            }
          }

          return aResult;
        }
        /**
         * produces a duplicate-free version of the array
         *
         * @param {Array} array
         */


        function unique(array) {
          var results = [];

          for (var idx = 0, len = array.length; idx < len; idx++) {
            if (!contains(results, array[idx])) {
              results.push(array[idx]);
            }
          }

          return results;
        }
        /**
         * returns next item.
         * @param {Array} array
         */


        function lists_next(array, item) {
          if (array && array.length && item) {
            var idx = array.indexOf(item);
            return idx === -1 ? null : array[idx + 1];
          }

          return null;
        }
        /**
         * returns prev item.
         * @param {Array} array
         */


        function prev(array, item) {
          if (array && array.length && item) {
            var idx = array.indexOf(item);
            return idx === -1 ? null : array[idx - 1];
          }

          return null;
        }
        /**
         * @class core.list
         *
         * list utils
         *
         * @singleton
         * @alternateClassName list
         */

        /* harmony default export */


        var lists = {
          head: lists_head,
          last: lists_last,
          initial: initial,
          tail: tail,
          prev: prev,
          next: lists_next,
          find: find,
          contains: contains,
          all: lists_all,
          sum: sum,
          from: from,
          isEmpty: lists_isEmpty,
          clusterBy: clusterBy,
          compact: compact,
          unique: unique
        }; // CONCATENATED MODULE: ./src/js/base/core/dom.js

        var NBSP_CHAR = String.fromCharCode(160);
        var ZERO_WIDTH_NBSP_CHAR = "\uFEFF";
        /**
         * @method isEditable
         *
         * returns whether node is `note-editable` or not.
         *
         * @param {Node} node
         * @return {Boolean}
         */

        function isEditable(node) {
          return node && external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(node).hasClass('note-editable');
        }
        /**
         * @method isControlSizing
         *
         * returns whether node is `note-control-sizing` or not.
         *
         * @param {Node} node
         * @return {Boolean}
         */


        function isControlSizing(node) {
          return node && external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(node).hasClass('note-control-sizing');
        }
        /**
         * @method makePredByNodeName
         *
         * returns predicate which judge whether nodeName is same
         *
         * @param {String} nodeName
         * @return {Function}
         */


        function makePredByNodeName(nodeName) {
          nodeName = nodeName.toUpperCase();
          return function (node) {
            return node && node.nodeName.toUpperCase() === nodeName;
          };
        }
        /**
         * @method isText
         *
         *
         *
         * @param {Node} node
         * @return {Boolean} true if node's type is text(3)
         */


        function isText(node) {
          return node && node.nodeType === 3;
        }
        /**
         * @method isElement
         *
         *
         *
         * @param {Node} node
         * @return {Boolean} true if node's type is element(1)
         */


        function isElement(node) {
          return node && node.nodeType === 1;
        }
        /**
         * ex) br, col, embed, hr, img, input, ...
         * @see http://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements
         */


        function isVoid(node) {
          return node && /^BR|^IMG|^HR|^IFRAME|^BUTTON|^INPUT|^AUDIO|^VIDEO|^EMBED/.test(node.nodeName.toUpperCase());
        }

        function isPara(node) {
          if (isEditable(node)) {
            return false;
          } // Chrome(v31.0), FF(v25.0.1) use DIV for paragraph


          return node && /^DIV|^P|^LI|^H[1-7]/.test(node.nodeName.toUpperCase());
        }

        function isHeading(node) {
          return node && /^H[1-7]/.test(node.nodeName.toUpperCase());
        }

        var isPre = makePredByNodeName('PRE');
        var isLi = makePredByNodeName('LI');

        function isPurePara(node) {
          return isPara(node) && !isLi(node);
        }

        var isTable = makePredByNodeName('TABLE');
        var isData = makePredByNodeName('DATA');

        function dom_isInline(node) {
          return !isBodyContainer(node) && !isList(node) && !isHr(node) && !isPara(node) && !isTable(node) && !isBlockquote(node) && !isData(node);
        }

        function isList(node) {
          return node && /^UL|^OL/.test(node.nodeName.toUpperCase());
        }

        var isHr = makePredByNodeName('HR');

        function dom_isCell(node) {
          return node && /^TD|^TH/.test(node.nodeName.toUpperCase());
        }

        var isBlockquote = makePredByNodeName('BLOCKQUOTE');

        function isBodyContainer(node) {
          return dom_isCell(node) || isBlockquote(node) || isEditable(node);
        }

        var isAnchor = makePredByNodeName('A');

        function isParaInline(node) {
          return dom_isInline(node) && !!dom_ancestor(node, isPara);
        }

        function isBodyInline(node) {
          return dom_isInline(node) && !dom_ancestor(node, isPara);
        }

        var isBody = makePredByNodeName('BODY');
        /**
         * returns whether nodeB is closest sibling of nodeA
         *
         * @param {Node} nodeA
         * @param {Node} nodeB
         * @return {Boolean}
         */

        function isClosestSibling(nodeA, nodeB) {
          return nodeA.nextSibling === nodeB || nodeA.previousSibling === nodeB;
        }
        /**
         * returns array of closest siblings with node
         *
         * @param {Node} node
         * @param {function} [pred] - predicate function
         * @return {Node[]}
         */


        function withClosestSiblings(node, pred) {
          pred = pred || func.ok;
          var siblings = [];

          if (node.previousSibling && pred(node.previousSibling)) {
            siblings.push(node.previousSibling);
          }

          siblings.push(node);

          if (node.nextSibling && pred(node.nextSibling)) {
            siblings.push(node.nextSibling);
          }

          return siblings;
        }
        /**
         * blank HTML for cursor position
         * - [workaround] old IE only works with &nbsp;
         * - [workaround] IE11 and other browser works with bogus br
         */


        var blankHTML = env.isMSIE && env.browserVersion < 11 ? '&nbsp;' : '<br>';
        /**
         * @method nodeLength
         *
         * returns #text's text size or element's childNodes size
         *
         * @param {Node} node
         */

        function nodeLength(node) {
          if (isText(node)) {
            return node.nodeValue.length;
          }

          if (node) {
            return node.childNodes.length;
          }

          return 0;
        }
        /**
         * returns whether deepest child node is empty or not.
         *
         * @param {Node} node
         * @return {Boolean}
         */


        function deepestChildIsEmpty(node) {
          do {
            if (node.firstElementChild === null || node.firstElementChild.innerHTML === '') break;
          } while (node = node.firstElementChild);

          return dom_isEmpty(node);
        }
        /**
         * returns whether node is empty or not.
         *
         * @param {Node} node
         * @return {Boolean}
         */


        function dom_isEmpty(node) {
          var len = nodeLength(node);

          if (len === 0) {
            return true;
          } else if (!isText(node) && len === 1 && node.innerHTML === blankHTML) {
            // ex) <p><br></p>, <span><br></span>
            return true;
          } else if (lists.all(node.childNodes, isText) && node.innerHTML === '') {
            // ex) <p></p>, <span></span>
            return true;
          }

          return false;
        }
        /**
         * padding blankHTML if node is empty (for cursor position)
         */


        function paddingBlankHTML(node) {
          if (!isVoid(node) && !nodeLength(node)) {
            node.innerHTML = blankHTML;
          }
        }
        /**
         * find nearest ancestor predicate hit
         *
         * @param {Node} node
         * @param {Function} pred - predicate function
         */


        function dom_ancestor(node, pred) {
          while (node) {
            if (pred(node)) {
              return node;
            }

            if (isEditable(node)) {
              break;
            }

            node = node.parentNode;
          }

          return null;
        }
        /**
         * find nearest ancestor only single child blood line and predicate hit
         *
         * @param {Node} node
         * @param {Function} pred - predicate function
         */


        function singleChildAncestor(node, pred) {
          node = node.parentNode;

          while (node) {
            if (nodeLength(node) !== 1) {
              break;
            }

            if (pred(node)) {
              return node;
            }

            if (isEditable(node)) {
              break;
            }

            node = node.parentNode;
          }

          return null;
        }
        /**
         * returns new array of ancestor nodes (until predicate hit).
         *
         * @param {Node} node
         * @param {Function} [optional] pred - predicate function
         */


        function listAncestor(node, pred) {
          pred = pred || func.fail;
          var ancestors = [];
          dom_ancestor(node, function (el) {
            if (!isEditable(el)) {
              ancestors.push(el);
            }

            return pred(el);
          });
          return ancestors;
        }
        /**
         * find farthest ancestor predicate hit
         */


        function lastAncestor(node, pred) {
          var ancestors = listAncestor(node);
          return lists.last(ancestors.filter(pred));
        }
        /**
         * returns common ancestor node between two nodes.
         *
         * @param {Node} nodeA
         * @param {Node} nodeB
         */


        function dom_commonAncestor(nodeA, nodeB) {
          var ancestors = listAncestor(nodeA);

          for (var n = nodeB; n; n = n.parentNode) {
            if (ancestors.indexOf(n) > -1) return n;
          }

          return null; // difference document area
        }
        /**
         * listing all previous siblings (until predicate hit).
         *
         * @param {Node} node
         * @param {Function} [optional] pred - predicate function
         */


        function listPrev(node, pred) {
          pred = pred || func.fail;
          var nodes = [];

          while (node) {
            if (pred(node)) {
              break;
            }

            nodes.push(node);
            node = node.previousSibling;
          }

          return nodes;
        }
        /**
         * listing next siblings (until predicate hit).
         *
         * @param {Node} node
         * @param {Function} [pred] - predicate function
         */


        function listNext(node, pred) {
          pred = pred || func.fail;
          var nodes = [];

          while (node) {
            if (pred(node)) {
              break;
            }

            nodes.push(node);
            node = node.nextSibling;
          }

          return nodes;
        }
        /**
         * listing descendant nodes
         *
         * @param {Node} node
         * @param {Function} [pred] - predicate function
         */


        function listDescendant(node, pred) {
          var descendants = [];
          pred = pred || func.ok; // start DFS(depth first search) with node

          (function fnWalk(current) {
            if (node !== current && pred(current)) {
              descendants.push(current);
            }

            for (var idx = 0, len = current.childNodes.length; idx < len; idx++) {
              fnWalk(current.childNodes[idx]);
            }
          })(node);

          return descendants;
        }
        /**
         * wrap node with new tag.
         *
         * @param {Node} node
         * @param {Node} tagName of wrapper
         * @return {Node} - wrapper
         */


        function wrap(node, wrapperName) {
          var parent = node.parentNode;
          var wrapper = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()('<' + wrapperName + '>')[0];
          parent.insertBefore(wrapper, node);
          wrapper.appendChild(node);
          return wrapper;
        }
        /**
         * insert node after preceding
         *
         * @param {Node} node
         * @param {Node} preceding - predicate function
         */


        function insertAfter(node, preceding) {
          var next = preceding.nextSibling;
          var parent = preceding.parentNode;

          if (next) {
            parent.insertBefore(node, next);
          } else {
            parent.appendChild(node);
          }

          return node;
        }
        /**
         * append elements.
         *
         * @param {Node} node
         * @param {Collection} aChild
         */


        function appendChildNodes(node, aChild) {
          external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.each(aChild, function (idx, child) {
            node.appendChild(child);
          });
          return node;
        }
        /**
         * returns whether boundaryPoint is left edge or not.
         *
         * @param {BoundaryPoint} point
         * @return {Boolean}
         */


        function isLeftEdgePoint(point) {
          return point.offset === 0;
        }
        /**
         * returns whether boundaryPoint is right edge or not.
         *
         * @param {BoundaryPoint} point
         * @return {Boolean}
         */


        function isRightEdgePoint(point) {
          return point.offset === nodeLength(point.node);
        }
        /**
         * returns whether boundaryPoint is edge or not.
         *
         * @param {BoundaryPoint} point
         * @return {Boolean}
         */


        function isEdgePoint(point) {
          return isLeftEdgePoint(point) || isRightEdgePoint(point);
        }
        /**
         * returns whether node is left edge of ancestor or not.
         *
         * @param {Node} node
         * @param {Node} ancestor
         * @return {Boolean}
         */


        function dom_isLeftEdgeOf(node, ancestor) {
          while (node && node !== ancestor) {
            if (dom_position(node) !== 0) {
              return false;
            }

            node = node.parentNode;
          }

          return true;
        }
        /**
         * returns whether node is right edge of ancestor or not.
         *
         * @param {Node} node
         * @param {Node} ancestor
         * @return {Boolean}
         */


        function isRightEdgeOf(node, ancestor) {
          if (!ancestor) {
            return false;
          }

          while (node && node !== ancestor) {
            if (dom_position(node) !== nodeLength(node.parentNode) - 1) {
              return false;
            }

            node = node.parentNode;
          }

          return true;
        }
        /**
         * returns whether point is left edge of ancestor or not.
         * @param {BoundaryPoint} point
         * @param {Node} ancestor
         * @return {Boolean}
         */


        function isLeftEdgePointOf(point, ancestor) {
          return isLeftEdgePoint(point) && dom_isLeftEdgeOf(point.node, ancestor);
        }
        /**
         * returns whether point is right edge of ancestor or not.
         * @param {BoundaryPoint} point
         * @param {Node} ancestor
         * @return {Boolean}
         */


        function isRightEdgePointOf(point, ancestor) {
          return isRightEdgePoint(point) && isRightEdgeOf(point.node, ancestor);
        }
        /**
         * returns offset from parent.
         *
         * @param {Node} node
         */


        function dom_position(node) {
          var offset = 0;

          while (node = node.previousSibling) {
            offset += 1;
          }

          return offset;
        }

        function hasChildren(node) {
          return !!(node && node.childNodes && node.childNodes.length);
        }
        /**
         * returns previous boundaryPoint
         *
         * @param {BoundaryPoint} point
         * @param {Boolean} isSkipInnerOffset
         * @return {BoundaryPoint}
         */


        function dom_prevPoint(point, isSkipInnerOffset) {
          var node;
          var offset;

          if (point.offset === 0) {
            if (isEditable(point.node)) {
              return null;
            }

            node = point.node.parentNode;
            offset = dom_position(point.node);
          } else if (hasChildren(point.node)) {
            node = point.node.childNodes[point.offset - 1];
            offset = nodeLength(node);
          } else {
            node = point.node;
            offset = isSkipInnerOffset ? 0 : point.offset - 1;
          }

          return {
            node: node,
            offset: offset
          };
        }
        /**
         * returns next boundaryPoint
         *
         * @param {BoundaryPoint} point
         * @param {Boolean} isSkipInnerOffset
         * @return {BoundaryPoint}
         */


        function dom_nextPoint(point, isSkipInnerOffset) {
          var node, offset;

          if (nodeLength(point.node) === point.offset) {
            if (isEditable(point.node)) {
              return null;
            }

            var nextTextNode = getNextTextNode(point.node);

            if (nextTextNode) {
              node = nextTextNode;
              offset = 0;
            } else {
              node = point.node.parentNode;
              offset = dom_position(point.node) + 1;
            }
          } else if (hasChildren(point.node)) {
            node = point.node.childNodes[point.offset];
            offset = 0;
          } else {
            node = point.node;
            offset = isSkipInnerOffset ? nodeLength(point.node) : point.offset + 1;
          }

          return {
            node: node,
            offset: offset
          };
        }
        /**
         * returns next boundaryPoint with empty node
         *
         * @param {BoundaryPoint} point
         * @param {Boolean} isSkipInnerOffset
         * @return {BoundaryPoint}
         */


        function nextPointWithEmptyNode(point, isSkipInnerOffset) {
          var node, offset; // if node is empty string node, return current node's sibling.

          if (dom_isEmpty(point.node)) {
            node = point.node.nextSibling;
            offset = 0;
            return {
              node: node,
              offset: offset
            };
          }

          if (nodeLength(point.node) === point.offset) {
            if (isEditable(point.node)) {
              return null;
            }

            var nextTextNode = getNextTextNode(point.node);

            if (nextTextNode) {
              node = nextTextNode;
              offset = 0;
            } else {
              node = point.node.parentNode;
              offset = dom_position(point.node) + 1;
            } // if next node is editable, return current node's sibling node.


            if (isEditable(node)) {
              node = point.node.nextSibling;
              offset = 0;
            }
          } else if (hasChildren(point.node)) {
            node = point.node.childNodes[point.offset];
            offset = 0;

            if (dom_isEmpty(node)) {
              return null;
            }
          } else {
            node = point.node;
            offset = isSkipInnerOffset ? nodeLength(point.node) : point.offset + 1;

            if (dom_isEmpty(node)) {
              return null;
            }
          }

          return {
            node: node,
            offset: offset
          };
        }
        /*
        * returns the next Text node index or 0 if not found.
        */


        function getNextTextNode(actual) {
          if (!actual.nextSibling) return undefined;
          if (actual.parent !== actual.nextSibling.parent) return undefined;
          if (isText(actual.nextSibling)) return actual.nextSibling;
          return getNextTextNode(actual.nextSibling);
        }
        /**
         * returns whether pointA and pointB is same or not.
         *
         * @param {BoundaryPoint} pointA
         * @param {BoundaryPoint} pointB
         * @return {Boolean}
         */


        function isSamePoint(pointA, pointB) {
          return pointA.node === pointB.node && pointA.offset === pointB.offset;
        }
        /**
         * returns whether point is visible (can set cursor) or not.
         *
         * @param {BoundaryPoint} point
         * @return {Boolean}
         */


        function isVisiblePoint(point) {
          if (isText(point.node) || !hasChildren(point.node) || dom_isEmpty(point.node)) {
            return true;
          }

          var leftNode = point.node.childNodes[point.offset - 1];
          var rightNode = point.node.childNodes[point.offset];

          if ((!leftNode || isVoid(leftNode)) && (!rightNode || isVoid(rightNode))) {
            return true;
          }

          return false;
        }
        /**
         * @method prevPointUtil
         *
         * @param {BoundaryPoint} point
         * @param {Function} pred
         * @return {BoundaryPoint}
         */


        function prevPointUntil(point, pred) {
          while (point) {
            if (pred(point)) {
              return point;
            }

            point = dom_prevPoint(point);
          }

          return null;
        }
        /**
         * @method nextPointUntil
         *
         * @param {BoundaryPoint} point
         * @param {Function} pred
         * @return {BoundaryPoint}
         */


        function nextPointUntil(point, pred) {
          while (point) {
            if (pred(point)) {
              return point;
            }

            point = dom_nextPoint(point);
          }

          return null;
        }
        /**
         * returns whether point has character or not.
         *
         * @param {Point} point
         * @return {Boolean}
         */


        function isCharPoint(point) {
          if (!isText(point.node)) {
            return false;
          }

          var ch = point.node.nodeValue.charAt(point.offset - 1);
          return ch && ch !== ' ' && ch !== NBSP_CHAR;
        }
        /**
         * returns whether point has space or not.
         *
         * @param {Point} point
         * @return {Boolean}
         */


        function isSpacePoint(point) {
          if (!isText(point.node)) {
            return false;
          }

          var ch = point.node.nodeValue.charAt(point.offset - 1);
          return ch === ' ' || ch === NBSP_CHAR;
        }
        /**
         * @method walkPoint
         *
         * @param {BoundaryPoint} startPoint
         * @param {BoundaryPoint} endPoint
         * @param {Function} handler
         * @param {Boolean} isSkipInnerOffset
         */


        function walkPoint(startPoint, endPoint, handler, isSkipInnerOffset) {
          var point = startPoint;

          while (point) {
            handler(point);

            if (isSamePoint(point, endPoint)) {
              break;
            }

            var isSkipOffset = isSkipInnerOffset && startPoint.node !== point.node && endPoint.node !== point.node;
            point = nextPointWithEmptyNode(point, isSkipOffset);
          }
        }
        /**
         * @method makeOffsetPath
         *
         * return offsetPath(array of offset) from ancestor
         *
         * @param {Node} ancestor - ancestor node
         * @param {Node} node
         */


        function makeOffsetPath(ancestor, node) {
          var ancestors = listAncestor(node, func.eq(ancestor));
          return ancestors.map(dom_position).reverse();
        }
        /**
         * @method fromOffsetPath
         *
         * return element from offsetPath(array of offset)
         *
         * @param {Node} ancestor - ancestor node
         * @param {array} offsets - offsetPath
         */


        function fromOffsetPath(ancestor, offsets) {
          var current = ancestor;

          for (var i = 0, len = offsets.length; i < len; i++) {
            if (current.childNodes.length <= offsets[i]) {
              current = current.childNodes[current.childNodes.length - 1];
            } else {
              current = current.childNodes[offsets[i]];
            }
          }

          return current;
        }
        /**
         * @method splitNode
         *
         * split element or #text
         *
         * @param {BoundaryPoint} point
         * @param {Object} [options]
         * @param {Boolean} [options.isSkipPaddingBlankHTML] - default: false
         * @param {Boolean} [options.isNotSplitEdgePoint] - default: false
         * @param {Boolean} [options.isDiscardEmptySplits] - default: false
         * @return {Node} right node of boundaryPoint
         */


        function splitNode(point, options) {
          var isSkipPaddingBlankHTML = options && options.isSkipPaddingBlankHTML;
          var isNotSplitEdgePoint = options && options.isNotSplitEdgePoint;
          var isDiscardEmptySplits = options && options.isDiscardEmptySplits;

          if (isDiscardEmptySplits) {
            isSkipPaddingBlankHTML = true;
          } // edge case


          if (isEdgePoint(point) && (isText(point.node) || isNotSplitEdgePoint)) {
            if (isLeftEdgePoint(point)) {
              return point.node;
            } else if (isRightEdgePoint(point)) {
              return point.node.nextSibling;
            }
          } // split #text


          if (isText(point.node)) {
            return point.node.splitText(point.offset);
          } else {
            var childNode = point.node.childNodes[point.offset];
            var clone = insertAfter(point.node.cloneNode(false), point.node);
            appendChildNodes(clone, listNext(childNode));

            if (!isSkipPaddingBlankHTML) {
              paddingBlankHTML(point.node);
              paddingBlankHTML(clone);
            }

            if (isDiscardEmptySplits) {
              if (dom_isEmpty(point.node)) {
                remove(point.node);
              }

              if (dom_isEmpty(clone)) {
                remove(clone);
                return point.node.nextSibling;
              }
            }

            return clone;
          }
        }
        /**
         * @method splitTree
         *
         * split tree by point
         *
         * @param {Node} root - split root
         * @param {BoundaryPoint} point
         * @param {Object} [options]
         * @param {Boolean} [options.isSkipPaddingBlankHTML] - default: false
         * @param {Boolean} [options.isNotSplitEdgePoint] - default: false
         * @return {Node} right node of boundaryPoint
         */


        function splitTree(root, point, options) {
          // ex) [#text, <span>, <p>]
          var ancestors = listAncestor(point.node, func.eq(root));

          if (!ancestors.length) {
            return null;
          } else if (ancestors.length === 1) {
            return splitNode(point, options);
          }

          return ancestors.reduce(function (node, parent) {
            if (node === point.node) {
              node = splitNode(point, options);
            }

            return splitNode({
              node: parent,
              offset: node ? dom_position(node) : nodeLength(parent)
            }, options);
          });
        }
        /**
         * split point
         *
         * @param {Point} point
         * @param {Boolean} isInline
         * @return {Object}
         */


        function splitPoint(point, isInline) {
          // find splitRoot, container
          //  - inline: splitRoot is a child of paragraph
          //  - block: splitRoot is a child of bodyContainer
          var pred = isInline ? isPara : isBodyContainer;
          var ancestors = listAncestor(point.node, pred);
          var topAncestor = lists.last(ancestors) || point.node;
          var splitRoot, container;

          if (pred(topAncestor)) {
            splitRoot = ancestors[ancestors.length - 2];
            container = topAncestor;
          } else {
            splitRoot = topAncestor;
            container = splitRoot.parentNode;
          } // if splitRoot is exists, split with splitTree


          var pivot = splitRoot && splitTree(splitRoot, point, {
            isSkipPaddingBlankHTML: isInline,
            isNotSplitEdgePoint: isInline
          }); // if container is point.node, find pivot with point.offset

          if (!pivot && container === point.node) {
            pivot = point.node.childNodes[point.offset];
          }

          return {
            rightNode: pivot,
            container: container
          };
        }

        function dom_create(nodeName) {
          return document.createElement(nodeName);
        }

        function createText(text) {
          return document.createTextNode(text);
        }
        /**
         * @method remove
         *
         * remove node, (isRemoveChild: remove child or not)
         *
         * @param {Node} node
         * @param {Boolean} isRemoveChild
         */


        function remove(node, isRemoveChild) {
          if (!node || !node.parentNode) {
            return;
          }

          if (node.removeNode) {
            return node.removeNode(isRemoveChild);
          }

          var parent = node.parentNode;

          if (!isRemoveChild) {
            var nodes = [];

            for (var i = 0, len = node.childNodes.length; i < len; i++) {
              nodes.push(node.childNodes[i]);
            }

            for (var _i = 0, _len = nodes.length; _i < _len; _i++) {
              parent.insertBefore(nodes[_i], node);
            }
          }

          parent.removeChild(node);
        }
        /**
         * @method removeWhile
         *
         * @param {Node} node
         * @param {Function} pred
         */


        function removeWhile(node, pred) {
          while (node) {
            if (isEditable(node) || !pred(node)) {
              break;
            }

            var parent = node.parentNode;
            remove(node);
            node = parent;
          }
        }
        /**
         * @method replace
         *
         * replace node with provided nodeName
         *
         * @param {Node} node
         * @param {String} nodeName
         * @return {Node} - new node
         */


        function dom_replace(node, nodeName) {
          if (node.nodeName.toUpperCase() === nodeName.toUpperCase()) {
            return node;
          }

          var newNode = dom_create(nodeName);

          if (node.style.cssText) {
            newNode.style.cssText = node.style.cssText;
          }

          appendChildNodes(newNode, lists.from(node.childNodes));
          insertAfter(newNode, node);
          remove(node);
          return newNode;
        }

        var isTextarea = makePredByNodeName('TEXTAREA');
        /**
         * @param {jQuery} $node
         * @param {Boolean} [stripLinebreaks] - default: false
         */

        function dom_value($node, stripLinebreaks) {
          var val = isTextarea($node[0]) ? $node.val() : $node.html();

          if (stripLinebreaks) {
            return val.replace(/[\n\r]/g, '');
          }

          return val;
        }
        /**
         * @method html
         *
         * get the HTML contents of node
         *
         * @param {jQuery} $node
         * @param {Boolean} [isNewlineOnBlock]
         */


        function dom_html($node, isNewlineOnBlock) {
          var markup = dom_value($node);

          if (isNewlineOnBlock) {
            var regexTag = /<(\/?)(\b(?!!)[^>\s]*)(.*?)(\s*\/?>)/g;
            markup = markup.replace(regexTag, function (match, endSlash, name) {
              name = name.toUpperCase();
              var isEndOfInlineContainer = /^DIV|^TD|^TH|^P|^LI|^H[1-7]/.test(name) && !!endSlash;
              var isBlockNode = /^BLOCKQUOTE|^TABLE|^TBODY|^TR|^HR|^UL|^OL/.test(name);
              return match + (isEndOfInlineContainer || isBlockNode ? '\n' : '');
            });
            markup = markup.trim();
          }

          return markup;
        }

        function posFromPlaceholder(placeholder) {
          var $placeholder = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(placeholder);
          var pos = $placeholder.offset();
          var height = $placeholder.outerHeight(true); // include margin

          return {
            left: pos.left,
            top: pos.top + height
          };
        }

        function attachEvents($node, events) {
          Object.keys(events).forEach(function (key) {
            $node.on(key, events[key]);
          });
        }

        function detachEvents($node, events) {
          Object.keys(events).forEach(function (key) {
            $node.off(key, events[key]);
          });
        }
        /**
         * @method isCustomStyleTag
         *
         * assert if a node contains a "note-styletag" class,
         * which implies that's a custom-made style tag node
         *
         * @param {Node} an HTML DOM node
         */


        function isCustomStyleTag(node) {
          return node && !isText(node) && lists.contains(node.classList, 'note-styletag');
        }
        /* harmony default export */


        var dom = {
          /** @property {String} NBSP_CHAR */
          NBSP_CHAR: NBSP_CHAR,

          /** @property {String} ZERO_WIDTH_NBSP_CHAR */
          ZERO_WIDTH_NBSP_CHAR: ZERO_WIDTH_NBSP_CHAR,

          /** @property {String} blank */
          blank: blankHTML,

          /** @property {String} emptyPara */
          emptyPara: "<p>".concat(blankHTML, "</p>"),
          makePredByNodeName: makePredByNodeName,
          isEditable: isEditable,
          isControlSizing: isControlSizing,
          isText: isText,
          isElement: isElement,
          isVoid: isVoid,
          isPara: isPara,
          isPurePara: isPurePara,
          isHeading: isHeading,
          isInline: dom_isInline,
          isBlock: func.not(dom_isInline),
          isBodyInline: isBodyInline,
          isBody: isBody,
          isParaInline: isParaInline,
          isPre: isPre,
          isList: isList,
          isTable: isTable,
          isData: isData,
          isCell: dom_isCell,
          isBlockquote: isBlockquote,
          isBodyContainer: isBodyContainer,
          isAnchor: isAnchor,
          isDiv: makePredByNodeName('DIV'),
          isLi: isLi,
          isBR: makePredByNodeName('BR'),
          isSpan: makePredByNodeName('SPAN'),
          isB: makePredByNodeName('B'),
          isU: makePredByNodeName('U'),
          isS: makePredByNodeName('S'),
          isI: makePredByNodeName('I'),
          isImg: makePredByNodeName('IMG'),
          isTextarea: isTextarea,
          deepestChildIsEmpty: deepestChildIsEmpty,
          isEmpty: dom_isEmpty,
          isEmptyAnchor: func.and(isAnchor, dom_isEmpty),
          isClosestSibling: isClosestSibling,
          withClosestSiblings: withClosestSiblings,
          nodeLength: nodeLength,
          isLeftEdgePoint: isLeftEdgePoint,
          isRightEdgePoint: isRightEdgePoint,
          isEdgePoint: isEdgePoint,
          isLeftEdgeOf: dom_isLeftEdgeOf,
          isRightEdgeOf: isRightEdgeOf,
          isLeftEdgePointOf: isLeftEdgePointOf,
          isRightEdgePointOf: isRightEdgePointOf,
          prevPoint: dom_prevPoint,
          nextPoint: dom_nextPoint,
          nextPointWithEmptyNode: nextPointWithEmptyNode,
          isSamePoint: isSamePoint,
          isVisiblePoint: isVisiblePoint,
          prevPointUntil: prevPointUntil,
          nextPointUntil: nextPointUntil,
          isCharPoint: isCharPoint,
          isSpacePoint: isSpacePoint,
          walkPoint: walkPoint,
          ancestor: dom_ancestor,
          singleChildAncestor: singleChildAncestor,
          listAncestor: listAncestor,
          lastAncestor: lastAncestor,
          listNext: listNext,
          listPrev: listPrev,
          listDescendant: listDescendant,
          commonAncestor: dom_commonAncestor,
          wrap: wrap,
          insertAfter: insertAfter,
          appendChildNodes: appendChildNodes,
          position: dom_position,
          hasChildren: hasChildren,
          makeOffsetPath: makeOffsetPath,
          fromOffsetPath: fromOffsetPath,
          splitTree: splitTree,
          splitPoint: splitPoint,
          create: dom_create,
          createText: createText,
          remove: remove,
          removeWhile: removeWhile,
          replace: dom_replace,
          html: dom_html,
          value: dom_value,
          posFromPlaceholder: posFromPlaceholder,
          attachEvents: attachEvents,
          detachEvents: detachEvents,
          isCustomStyleTag: isCustomStyleTag
        }; // CONCATENATED MODULE: ./src/js/base/Context.js

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        var Context_Context = /*#__PURE__*/function () {
          /**
           * @param {jQuery} $note
           * @param {Object} options
           */
          function Context($note, options) {
            _classCallCheck(this, Context);

            this.$note = $note;
            this.memos = {};
            this.modules = {};
            this.layoutInfo = {};
            this.options = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.extend(true, {}, options); // init ui with options

            external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.summernote.ui = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.summernote.ui_template(this.options);
            this.ui = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.summernote.ui;
            this.initialize();
          }
          /**
           * create layout and initialize modules and other resources
           */


          _createClass(Context, [{
            key: "initialize",
            value: function initialize() {
              this.layoutInfo = this.ui.createLayout(this.$note);

              this._initialize();

              this.$note.hide();
              return this;
            }
            /**
             * destroy modules and other resources and remove layout
             */

          }, {
            key: "destroy",
            value: function destroy() {
              this._destroy();

              this.$note.removeData('summernote');
              this.ui.removeLayout(this.$note, this.layoutInfo);
            }
            /**
             * destory modules and other resources and initialize it again
             */

          }, {
            key: "reset",
            value: function reset() {
              var disabled = this.isDisabled();
              this.code(dom.emptyPara);

              this._destroy();

              this._initialize();

              if (disabled) {
                this.disable();
              }
            }
          }, {
            key: "_initialize",
            value: function _initialize() {
              var _this = this; // set own id


              this.options.id = func.uniqueId(external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.now()); // set default container for tooltips, popovers, and dialogs

              this.options.container = this.options.container || this.layoutInfo.editor; // add optional buttons

              var buttons = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.extend({}, this.options.buttons);
              Object.keys(buttons).forEach(function (key) {
                _this.memo('button.' + key, buttons[key]);
              });
              var modules = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.extend({}, this.options.modules, external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.summernote.plugins || {}); // add and initialize modules

              Object.keys(modules).forEach(function (key) {
                _this.module(key, modules[key], true);
              });
              Object.keys(this.modules).forEach(function (key) {
                _this.initializeModule(key);
              });
            }
          }, {
            key: "_destroy",
            value: function _destroy() {
              var _this2 = this; // destroy modules with reversed order


              Object.keys(this.modules).reverse().forEach(function (key) {
                _this2.removeModule(key);
              });
              Object.keys(this.memos).forEach(function (key) {
                _this2.removeMemo(key);
              }); // trigger custom onDestroy callback

              this.triggerEvent('destroy', this);
            }
          }, {
            key: "code",
            value: function code(html) {
              var isActivated = this.invoke('codeview.isActivated');

              if (html === undefined) {
                this.invoke('codeview.sync');
                return isActivated ? this.layoutInfo.codable.val() : this.layoutInfo.editable.html();
              } else {
                if (isActivated) {
                  this.invoke('codeview.sync', html);
                } else {
                  this.layoutInfo.editable.html(html);
                }

                this.$note.val(html);
                this.triggerEvent('change', html, this.layoutInfo.editable);
              }
            }
          }, {
            key: "isDisabled",
            value: function isDisabled() {
              return this.layoutInfo.editable.attr('contenteditable') === 'false';
            }
          }, {
            key: "enable",
            value: function enable() {
              this.layoutInfo.editable.attr('contenteditable', true);
              this.invoke('toolbar.activate', true);
              this.triggerEvent('disable', false);
              this.options.editing = true;
            }
          }, {
            key: "disable",
            value: function disable() {
              // close codeview if codeview is opend
              if (this.invoke('codeview.isActivated')) {
                this.invoke('codeview.deactivate');
              }

              this.layoutInfo.editable.attr('contenteditable', false);
              this.options.editing = false;
              this.invoke('toolbar.deactivate', true);
              this.triggerEvent('disable', true);
            }
          }, {
            key: "triggerEvent",
            value: function triggerEvent() {
              var namespace = lists.head(arguments);
              var args = lists.tail(lists.from(arguments));
              var callback = this.options.callbacks[func.namespaceToCamel(namespace, 'on')];

              if (callback) {
                callback.apply(this.$note[0], args);
              }

              this.$note.trigger('summernote.' + namespace, args);
            }
          }, {
            key: "initializeModule",
            value: function initializeModule(key) {
              var module = this.modules[key];
              module.shouldInitialize = module.shouldInitialize || func.ok;

              if (!module.shouldInitialize()) {
                return;
              } // initialize module


              if (module.initialize) {
                module.initialize();
              } // attach events


              if (module.events) {
                dom.attachEvents(this.$note, module.events);
              }
            }
          }, {
            key: "module",
            value: function module(key, ModuleClass, withoutIntialize) {
              if (arguments.length === 1) {
                return this.modules[key];
              }

              this.modules[key] = new ModuleClass(this);

              if (!withoutIntialize) {
                this.initializeModule(key);
              }
            }
          }, {
            key: "removeModule",
            value: function removeModule(key) {
              var module = this.modules[key];

              if (module.shouldInitialize()) {
                if (module.events) {
                  dom.detachEvents(this.$note, module.events);
                }

                if (module.destroy) {
                  module.destroy();
                }
              }

              delete this.modules[key];
            }
          }, {
            key: "memo",
            value: function memo(key, obj) {
              if (arguments.length === 1) {
                return this.memos[key];
              }

              this.memos[key] = obj;
            }
          }, {
            key: "removeMemo",
            value: function removeMemo(key) {
              if (this.memos[key] && this.memos[key].destroy) {
                this.memos[key].destroy();
              }

              delete this.memos[key];
            }
            /**
             * Some buttons need to change their visual style immediately once they get pressed
             */

          }, {
            key: "createInvokeHandlerAndUpdateState",
            value: function createInvokeHandlerAndUpdateState(namespace, value) {
              var _this3 = this;

              return function (event) {
                _this3.createInvokeHandler(namespace, value)(event);

                _this3.invoke('buttons.updateCurrentStyle');
              };
            }
          }, {
            key: "createInvokeHandler",
            value: function createInvokeHandler(namespace, value) {
              var _this4 = this;

              return function (event) {
                event.preventDefault();
                var $target = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(event.target);

                _this4.invoke(namespace, value || $target.closest('[data-value]').data('value'), $target);
              };
            }
          }, {
            key: "invoke",
            value: function invoke() {
              var namespace = lists.head(arguments);
              var args = lists.tail(lists.from(arguments));
              var splits = namespace.split('.');
              var hasSeparator = splits.length > 1;
              var moduleName = hasSeparator && lists.head(splits);
              var methodName = hasSeparator ? lists.last(splits) : lists.head(splits);
              var module = this.modules[moduleName || 'editor'];

              if (!moduleName && this[methodName]) {
                return this[methodName].apply(this, args);
              } else if (module && module[methodName] && module.shouldInitialize()) {
                return module[methodName].apply(module, args);
              }
            }
          }]);

          return Context;
        }(); // CONCATENATED MODULE: ./src/js/summernote.js


        external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.fn.extend({
          /**
           * Summernote API
           *
           * @param {Object|String}
           * @return {this}
           */
          summernote: function summernote() {
            var type = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.type(lists.head(arguments));
            var isExternalAPICalled = type === 'string';
            var hasInitOptions = type === 'object';
            var options = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.extend({}, external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.summernote.options, hasInitOptions ? lists.head(arguments) : {}); // Update options

            options.langInfo = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.extend(true, {}, external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.summernote.lang['en-US'], external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.summernote.lang[options.lang]);
            options.icons = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.extend(true, {}, external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.summernote.options.icons, options.icons);
            options.tooltip = options.tooltip === 'auto' ? !env.isSupportTouch : options.tooltip;
            this.each(function (idx, note) {
              var $note = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(note);

              if (!$note.data('summernote')) {
                var context = new Context_Context($note, options);
                $note.data('summernote', context);
                $note.data('summernote').triggerEvent('init', context.layoutInfo);
              }
            });
            var $note = this.first();

            if ($note.length) {
              var context = $note.data('summernote');

              if (isExternalAPICalled) {
                return context.invoke.apply(context, lists.from(arguments));
              } else if (options.focus) {
                context.invoke('editor.focus');
              }
            }

            return this;
          }
        }); // CONCATENATED MODULE: ./src/js/base/core/range.js

        function range_classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function range_defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function range_createClass(Constructor, protoProps, staticProps) {
          if (protoProps) range_defineProperties(Constructor.prototype, protoProps);
          if (staticProps) range_defineProperties(Constructor, staticProps);
          return Constructor;
        }
        /**
         * return boundaryPoint from TextRange, inspired by Andy Na's HuskyRange.js
         *
         * @param {TextRange} textRange
         * @param {Boolean} isStart
         * @return {BoundaryPoint}
         *
         * @see http://msdn.microsoft.com/en-us/library/ie/ms535872(v=vs.85).aspx
         */


        function textRangeToPoint(textRange, isStart) {
          var container = textRange.parentElement();
          var offset;
          var tester = document.body.createTextRange();
          var prevContainer;
          var childNodes = lists.from(container.childNodes);

          for (offset = 0; offset < childNodes.length; offset++) {
            if (dom.isText(childNodes[offset])) {
              continue;
            }

            tester.moveToElementText(childNodes[offset]);

            if (tester.compareEndPoints('StartToStart', textRange) >= 0) {
              break;
            }

            prevContainer = childNodes[offset];
          }

          if (offset !== 0 && dom.isText(childNodes[offset - 1])) {
            var textRangeStart = document.body.createTextRange();
            var curTextNode = null;
            textRangeStart.moveToElementText(prevContainer || container);
            textRangeStart.collapse(!prevContainer);
            curTextNode = prevContainer ? prevContainer.nextSibling : container.firstChild;
            var pointTester = textRange.duplicate();
            pointTester.setEndPoint('StartToStart', textRangeStart);
            var textCount = pointTester.text.replace(/[\r\n]/g, '').length;

            while (textCount > curTextNode.nodeValue.length && curTextNode.nextSibling) {
              textCount -= curTextNode.nodeValue.length;
              curTextNode = curTextNode.nextSibling;
            } // [workaround] enforce IE to re-reference curTextNode, hack


            var dummy = curTextNode.nodeValue; // eslint-disable-line

            if (isStart && curTextNode.nextSibling && dom.isText(curTextNode.nextSibling) && textCount === curTextNode.nodeValue.length) {
              textCount -= curTextNode.nodeValue.length;
              curTextNode = curTextNode.nextSibling;
            }

            container = curTextNode;
            offset = textCount;
          }

          return {
            cont: container,
            offset: offset
          };
        }
        /**
         * return TextRange from boundary point (inspired by google closure-library)
         * @param {BoundaryPoint} point
         * @return {TextRange}
         */


        function pointToTextRange(point) {
          var textRangeInfo = function textRangeInfo(container, offset) {
            var node, isCollapseToStart;

            if (dom.isText(container)) {
              var prevTextNodes = dom.listPrev(container, func.not(dom.isText));
              var prevContainer = lists.last(prevTextNodes).previousSibling;
              node = prevContainer || container.parentNode;
              offset += lists.sum(lists.tail(prevTextNodes), dom.nodeLength);
              isCollapseToStart = !prevContainer;
            } else {
              node = container.childNodes[offset] || container;

              if (dom.isText(node)) {
                return textRangeInfo(node, 0);
              }

              offset = 0;
              isCollapseToStart = false;
            }

            return {
              node: node,
              collapseToStart: isCollapseToStart,
              offset: offset
            };
          };

          var textRange = document.body.createTextRange();
          var info = textRangeInfo(point.node, point.offset);
          textRange.moveToElementText(info.node);
          textRange.collapse(info.collapseToStart);
          textRange.moveStart('character', info.offset);
          return textRange;
        }
        /**
           * Wrapped Range
           *
           * @constructor
           * @param {Node} sc - start container
           * @param {Number} so - start offset
           * @param {Node} ec - end container
           * @param {Number} eo - end offset
           */


        var range_WrappedRange = /*#__PURE__*/function () {
          function WrappedRange(sc, so, ec, eo) {
            range_classCallCheck(this, WrappedRange);
            this.sc = sc;
            this.so = so;
            this.ec = ec;
            this.eo = eo; // isOnEditable: judge whether range is on editable or not

            this.isOnEditable = this.makeIsOn(dom.isEditable); // isOnList: judge whether range is on list node or not

            this.isOnList = this.makeIsOn(dom.isList); // isOnAnchor: judge whether range is on anchor node or not

            this.isOnAnchor = this.makeIsOn(dom.isAnchor); // isOnCell: judge whether range is on cell node or not

            this.isOnCell = this.makeIsOn(dom.isCell); // isOnData: judge whether range is on data node or not

            this.isOnData = this.makeIsOn(dom.isData);
          } // nativeRange: get nativeRange from sc, so, ec, eo


          range_createClass(WrappedRange, [{
            key: "nativeRange",
            value: function nativeRange() {
              if (env.isW3CRangeSupport) {
                var w3cRange = document.createRange();
                w3cRange.setStart(this.sc, this.so);
                w3cRange.setEnd(this.ec, this.eo);
                return w3cRange;
              } else {
                var textRange = pointToTextRange({
                  node: this.sc,
                  offset: this.so
                });
                textRange.setEndPoint('EndToEnd', pointToTextRange({
                  node: this.ec,
                  offset: this.eo
                }));
                return textRange;
              }
            }
          }, {
            key: "getPoints",
            value: function getPoints() {
              return {
                sc: this.sc,
                so: this.so,
                ec: this.ec,
                eo: this.eo
              };
            }
          }, {
            key: "getStartPoint",
            value: function getStartPoint() {
              return {
                node: this.sc,
                offset: this.so
              };
            }
          }, {
            key: "getEndPoint",
            value: function getEndPoint() {
              return {
                node: this.ec,
                offset: this.eo
              };
            }
            /**
             * select update visible range
             */

          }, {
            key: "select",
            value: function select() {
              var nativeRng = this.nativeRange();

              if (env.isW3CRangeSupport) {
                var selection = document.getSelection();

                if (selection.rangeCount > 0) {
                  selection.removeAllRanges();
                }

                selection.addRange(nativeRng);
              } else {
                nativeRng.select();
              }

              return this;
            }
            /**
             * Moves the scrollbar to start container(sc) of current range
             *
             * @return {WrappedRange}
             */

          }, {
            key: "scrollIntoView",
            value: function scrollIntoView(container) {
              var height = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(container).height();

              if (container.scrollTop + height < this.sc.offsetTop) {
                container.scrollTop += Math.abs(container.scrollTop + height - this.sc.offsetTop);
              }

              return this;
            }
            /**
             * @return {WrappedRange}
             */

          }, {
            key: "normalize",
            value: function normalize() {
              /**
               * @param {BoundaryPoint} point
               * @param {Boolean} isLeftToRight - true: prefer to choose right node
               *                                - false: prefer to choose left node
               * @return {BoundaryPoint}
               */
              var getVisiblePoint = function getVisiblePoint(point, isLeftToRight) {
                if (!point) {
                  return point;
                } // Just use the given point [XXX:Adhoc]
                //  - case 01. if the point is on the middle of the node
                //  - case 02. if the point is on the right edge and prefer to choose left node
                //  - case 03. if the point is on the left edge and prefer to choose right node
                //  - case 04. if the point is on the right edge and prefer to choose right node but the node is void
                //  - case 05. if the point is on the left edge and prefer to choose left node but the node is void
                //  - case 06. if the point is on the block node and there is no children


                if (dom.isVisiblePoint(point)) {
                  if (!dom.isEdgePoint(point) || dom.isRightEdgePoint(point) && !isLeftToRight || dom.isLeftEdgePoint(point) && isLeftToRight || dom.isRightEdgePoint(point) && isLeftToRight && dom.isVoid(point.node.nextSibling) || dom.isLeftEdgePoint(point) && !isLeftToRight && dom.isVoid(point.node.previousSibling) || dom.isBlock(point.node) && dom.isEmpty(point.node)) {
                    return point;
                  }
                } // point on block's edge


                var block = dom.ancestor(point.node, dom.isBlock);
                var hasRightNode = false;

                if (!hasRightNode) {
                  var prevPoint = dom.prevPoint(point) || {
                    node: null
                  };
                  hasRightNode = (dom.isLeftEdgePointOf(point, block) || dom.isVoid(prevPoint.node)) && !isLeftToRight;
                }

                var hasLeftNode = false;

                if (!hasLeftNode) {
                  var _nextPoint = dom.nextPoint(point) || {
                    node: null
                  };

                  hasLeftNode = (dom.isRightEdgePointOf(point, block) || dom.isVoid(_nextPoint.node)) && isLeftToRight;
                }

                if (hasRightNode || hasLeftNode) {
                  // returns point already on visible point
                  if (dom.isVisiblePoint(point)) {
                    return point;
                  } // reverse direction


                  isLeftToRight = !isLeftToRight;
                }

                var nextPoint = isLeftToRight ? dom.nextPointUntil(dom.nextPoint(point), dom.isVisiblePoint) : dom.prevPointUntil(dom.prevPoint(point), dom.isVisiblePoint);
                return nextPoint || point;
              };

              var endPoint = getVisiblePoint(this.getEndPoint(), false);
              var startPoint = this.isCollapsed() ? endPoint : getVisiblePoint(this.getStartPoint(), true);
              return new WrappedRange(startPoint.node, startPoint.offset, endPoint.node, endPoint.offset);
            }
            /**
             * returns matched nodes on range
             *
             * @param {Function} [pred] - predicate function
             * @param {Object} [options]
             * @param {Boolean} [options.includeAncestor]
             * @param {Boolean} [options.fullyContains]
             * @return {Node[]}
             */

          }, {
            key: "nodes",
            value: function nodes(pred, options) {
              pred = pred || func.ok;
              var includeAncestor = options && options.includeAncestor;
              var fullyContains = options && options.fullyContains; // TODO compare points and sort

              var startPoint = this.getStartPoint();
              var endPoint = this.getEndPoint();
              var nodes = [];
              var leftEdgeNodes = [];
              dom.walkPoint(startPoint, endPoint, function (point) {
                if (dom.isEditable(point.node)) {
                  return;
                }

                var node;

                if (fullyContains) {
                  if (dom.isLeftEdgePoint(point)) {
                    leftEdgeNodes.push(point.node);
                  }

                  if (dom.isRightEdgePoint(point) && lists.contains(leftEdgeNodes, point.node)) {
                    node = point.node;
                  }
                } else if (includeAncestor) {
                  node = dom.ancestor(point.node, pred);
                } else {
                  node = point.node;
                }

                if (node && pred(node)) {
                  nodes.push(node);
                }
              }, true);
              return lists.unique(nodes);
            }
            /**
             * returns commonAncestor of range
             * @return {Element} - commonAncestor
             */

          }, {
            key: "commonAncestor",
            value: function commonAncestor() {
              return dom.commonAncestor(this.sc, this.ec);
            }
            /**
             * returns expanded range by pred
             *
             * @param {Function} pred - predicate function
             * @return {WrappedRange}
             */

          }, {
            key: "expand",
            value: function expand(pred) {
              var startAncestor = dom.ancestor(this.sc, pred);
              var endAncestor = dom.ancestor(this.ec, pred);

              if (!startAncestor && !endAncestor) {
                return new WrappedRange(this.sc, this.so, this.ec, this.eo);
              }

              var boundaryPoints = this.getPoints();

              if (startAncestor) {
                boundaryPoints.sc = startAncestor;
                boundaryPoints.so = 0;
              }

              if (endAncestor) {
                boundaryPoints.ec = endAncestor;
                boundaryPoints.eo = dom.nodeLength(endAncestor);
              }

              return new WrappedRange(boundaryPoints.sc, boundaryPoints.so, boundaryPoints.ec, boundaryPoints.eo);
            }
            /**
             * @param {Boolean} isCollapseToStart
             * @return {WrappedRange}
             */

          }, {
            key: "collapse",
            value: function collapse(isCollapseToStart) {
              if (isCollapseToStart) {
                return new WrappedRange(this.sc, this.so, this.sc, this.so);
              } else {
                return new WrappedRange(this.ec, this.eo, this.ec, this.eo);
              }
            }
            /**
             * splitText on range
             */

          }, {
            key: "splitText",
            value: function splitText() {
              var isSameContainer = this.sc === this.ec;
              var boundaryPoints = this.getPoints();

              if (dom.isText(this.ec) && !dom.isEdgePoint(this.getEndPoint())) {
                this.ec.splitText(this.eo);
              }

              if (dom.isText(this.sc) && !dom.isEdgePoint(this.getStartPoint())) {
                boundaryPoints.sc = this.sc.splitText(this.so);
                boundaryPoints.so = 0;

                if (isSameContainer) {
                  boundaryPoints.ec = boundaryPoints.sc;
                  boundaryPoints.eo = this.eo - this.so;
                }
              }

              return new WrappedRange(boundaryPoints.sc, boundaryPoints.so, boundaryPoints.ec, boundaryPoints.eo);
            }
            /**
             * delete contents on range
             * @return {WrappedRange}
             */

          }, {
            key: "deleteContents",
            value: function deleteContents() {
              if (this.isCollapsed()) {
                return this;
              }

              var rng = this.splitText();
              var nodes = rng.nodes(null, {
                fullyContains: true
              }); // find new cursor point

              var point = dom.prevPointUntil(rng.getStartPoint(), function (point) {
                return !lists.contains(nodes, point.node);
              });
              var emptyParents = [];
              external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.each(nodes, function (idx, node) {
                // find empty parents
                var parent = node.parentNode;

                if (point.node !== parent && dom.nodeLength(parent) === 1) {
                  emptyParents.push(parent);
                }

                dom.remove(node, false);
              }); // remove empty parents

              external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.each(emptyParents, function (idx, node) {
                dom.remove(node, false);
              });
              return new WrappedRange(point.node, point.offset, point.node, point.offset).normalize();
            }
            /**
             * makeIsOn: return isOn(pred) function
             */

          }, {
            key: "makeIsOn",
            value: function makeIsOn(pred) {
              return function () {
                var ancestor = dom.ancestor(this.sc, pred);
                return !!ancestor && ancestor === dom.ancestor(this.ec, pred);
              };
            }
            /**
             * @param {Function} pred
             * @return {Boolean}
             */

          }, {
            key: "isLeftEdgeOf",
            value: function isLeftEdgeOf(pred) {
              if (!dom.isLeftEdgePoint(this.getStartPoint())) {
                return false;
              }

              var node = dom.ancestor(this.sc, pred);
              return node && dom.isLeftEdgeOf(this.sc, node);
            }
            /**
             * returns whether range was collapsed or not
             */

          }, {
            key: "isCollapsed",
            value: function isCollapsed() {
              return this.sc === this.ec && this.so === this.eo;
            }
            /**
             * wrap inline nodes which children of body with paragraph
             *
             * @return {WrappedRange}
             */

          }, {
            key: "wrapBodyInlineWithPara",
            value: function wrapBodyInlineWithPara() {
              if (dom.isBodyContainer(this.sc) && dom.isEmpty(this.sc)) {
                this.sc.innerHTML = dom.emptyPara;
                return new WrappedRange(this.sc.firstChild, 0, this.sc.firstChild, 0);
              }
              /**
               * [workaround] firefox often create range on not visible point. so normalize here.
               *  - firefox: |<p>text</p>|
               *  - chrome: <p>|text|</p>
               */


              var rng = this.normalize();

              if (dom.isParaInline(this.sc) || dom.isPara(this.sc)) {
                return rng;
              } // find inline top ancestor


              var topAncestor;

              if (dom.isInline(rng.sc)) {
                var ancestors = dom.listAncestor(rng.sc, func.not(dom.isInline));
                topAncestor = lists.last(ancestors);

                if (!dom.isInline(topAncestor)) {
                  topAncestor = ancestors[ancestors.length - 2] || rng.sc.childNodes[rng.so];
                }
              } else {
                topAncestor = rng.sc.childNodes[rng.so > 0 ? rng.so - 1 : 0];
              }

              if (topAncestor) {
                // siblings not in paragraph
                var inlineSiblings = dom.listPrev(topAncestor, dom.isParaInline).reverse();
                inlineSiblings = inlineSiblings.concat(dom.listNext(topAncestor.nextSibling, dom.isParaInline)); // wrap with paragraph

                if (inlineSiblings.length) {
                  var para = dom.wrap(lists.head(inlineSiblings), 'p');
                  dom.appendChildNodes(para, lists.tail(inlineSiblings));
                }
              }

              return this.normalize();
            }
            /**
             * insert node at current cursor
             *
             * @param {Node} node
             * @return {Node}
             */

          }, {
            key: "insertNode",
            value: function insertNode(node) {
              var rng = this;

              if (dom.isText(node) || dom.isInline(node)) {
                rng = this.wrapBodyInlineWithPara().deleteContents();
              }

              var info = dom.splitPoint(rng.getStartPoint(), dom.isInline(node));

              if (info.rightNode) {
                info.rightNode.parentNode.insertBefore(node, info.rightNode);

                if (dom.isEmpty(info.rightNode) && dom.isPara(node)) {
                  info.rightNode.parentNode.removeChild(info.rightNode);
                }
              } else {
                info.container.appendChild(node);
              }

              return node;
            }
            /**
             * insert html at current cursor
             */

          }, {
            key: "pasteHTML",
            value: function pasteHTML(markup) {
              markup = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.trim(markup);
              var contentsContainer = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()('<div></div>').html(markup)[0];
              var childNodes = lists.from(contentsContainer.childNodes); // const rng = this.wrapBodyInlineWithPara().deleteContents();

              var rng = this;
              var reversed = false;

              if (rng.so >= 0) {
                childNodes = childNodes.reverse();
                reversed = true;
              }

              childNodes = childNodes.map(function (childNode) {
                return rng.insertNode(childNode);
              });

              if (reversed) {
                childNodes = childNodes.reverse();
              }

              return childNodes;
            }
            /**
             * returns text in range
             *
             * @return {String}
             */

          }, {
            key: "toString",
            value: function toString() {
              var nativeRng = this.nativeRange();
              return env.isW3CRangeSupport ? nativeRng.toString() : nativeRng.text;
            }
            /**
             * returns range for word before cursor
             *
             * @param {Boolean} [findAfter] - find after cursor, default: false
             * @return {WrappedRange}
             */

          }, {
            key: "getWordRange",
            value: function getWordRange(findAfter) {
              var endPoint = this.getEndPoint();

              if (!dom.isCharPoint(endPoint)) {
                return this;
              }

              var startPoint = dom.prevPointUntil(endPoint, function (point) {
                return !dom.isCharPoint(point);
              });

              if (findAfter) {
                endPoint = dom.nextPointUntil(endPoint, function (point) {
                  return !dom.isCharPoint(point);
                });
              }

              return new WrappedRange(startPoint.node, startPoint.offset, endPoint.node, endPoint.offset);
            }
            /**
             * returns range for words before cursor
             *
             * @param {Boolean} [findAfter] - find after cursor, default: false
             * @return {WrappedRange}
             */

          }, {
            key: "getWordsRange",
            value: function getWordsRange(findAfter) {
              var endPoint = this.getEndPoint();

              var isNotTextPoint = function isNotTextPoint(point) {
                return !dom.isCharPoint(point) && !dom.isSpacePoint(point);
              };

              if (isNotTextPoint(endPoint)) {
                return this;
              }

              var startPoint = dom.prevPointUntil(endPoint, isNotTextPoint);

              if (findAfter) {
                endPoint = dom.nextPointUntil(endPoint, isNotTextPoint);
              }

              return new WrappedRange(startPoint.node, startPoint.offset, endPoint.node, endPoint.offset);
            }
            /**
             * returns range for words before cursor that match with a Regex
             *
             * example:
             *  range: 'hi @Peter Pan'
             *  regex: '/@[a-z ]+/i'
             *  return range: '@Peter Pan'
             *
             * @param {RegExp} [regex]
             * @return {WrappedRange|null}
             */

          }, {
            key: "getWordsMatchRange",
            value: function getWordsMatchRange(regex) {
              var endPoint = this.getEndPoint();
              var startPoint = dom.prevPointUntil(endPoint, function (point) {
                if (!dom.isCharPoint(point) && !dom.isSpacePoint(point)) {
                  return true;
                }

                var rng = new WrappedRange(point.node, point.offset, endPoint.node, endPoint.offset);
                var result = regex.exec(rng.toString());
                return result && result.index === 0;
              });
              var rng = new WrappedRange(startPoint.node, startPoint.offset, endPoint.node, endPoint.offset);
              var text = rng.toString();
              var result = regex.exec(text);

              if (result && result[0].length === text.length) {
                return rng;
              } else {
                return null;
              }
            }
            /**
             * create offsetPath bookmark
             *
             * @param {Node} editable
             */

          }, {
            key: "bookmark",
            value: function bookmark(editable) {
              return {
                s: {
                  path: dom.makeOffsetPath(editable, this.sc),
                  offset: this.so
                },
                e: {
                  path: dom.makeOffsetPath(editable, this.ec),
                  offset: this.eo
                }
              };
            }
            /**
             * create offsetPath bookmark base on paragraph
             *
             * @param {Node[]} paras
             */

          }, {
            key: "paraBookmark",
            value: function paraBookmark(paras) {
              return {
                s: {
                  path: lists.tail(dom.makeOffsetPath(lists.head(paras), this.sc)),
                  offset: this.so
                },
                e: {
                  path: lists.tail(dom.makeOffsetPath(lists.last(paras), this.ec)),
                  offset: this.eo
                }
              };
            }
            /**
             * getClientRects
             * @return {Rect[]}
             */

          }, {
            key: "getClientRects",
            value: function getClientRects() {
              var nativeRng = this.nativeRange();
              return nativeRng.getClientRects();
            }
          }]);
          return WrappedRange;
        }();
        /**
         * Data structure
         *  * BoundaryPoint: a point of dom tree
         *  * BoundaryPoints: two boundaryPoints corresponding to the start and the end of the Range
         *
         * See to http://www.w3.org/TR/DOM-Level-2-Traversal-Range/ranges.html#Level-2-Range-Position
         */

        /* harmony default export */


        var range = {
          /**
           * create Range Object From arguments or Browser Selection
           *
           * @param {Node} sc - start container
           * @param {Number} so - start offset
           * @param {Node} ec - end container
           * @param {Number} eo - end offset
           * @return {WrappedRange}
           */
          create: function create(sc, so, ec, eo) {
            if (arguments.length === 4) {
              return new range_WrappedRange(sc, so, ec, eo);
            } else if (arguments.length === 2) {
              // collapsed
              ec = sc;
              eo = so;
              return new range_WrappedRange(sc, so, ec, eo);
            } else {
              var wrappedRange = this.createFromSelection();

              if (!wrappedRange && arguments.length === 1) {
                var bodyElement = arguments[0];

                if (dom.isEditable(bodyElement)) {
                  bodyElement = bodyElement.lastChild;
                }

                return this.createFromBodyElement(bodyElement, dom.emptyPara === arguments[0].innerHTML);
              }

              return wrappedRange;
            }
          },
          createFromBodyElement: function createFromBodyElement(bodyElement) {
            var isCollapseToStart = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var wrappedRange = this.createFromNode(bodyElement);
            return wrappedRange.collapse(isCollapseToStart);
          },
          createFromSelection: function createFromSelection() {
            var sc, so, ec, eo;

            if (env.isW3CRangeSupport) {
              var selection = document.getSelection();

              if (!selection || selection.rangeCount === 0) {
                return null;
              } else if (dom.isBody(selection.anchorNode)) {
                // Firefox: returns entire body as range on initialization.
                // We won't never need it.
                return null;
              }

              var nativeRng = selection.getRangeAt(0);
              sc = nativeRng.startContainer;
              so = nativeRng.startOffset;
              ec = nativeRng.endContainer;
              eo = nativeRng.endOffset;
            } else {
              // IE8: TextRange
              var textRange = document.selection.createRange();
              var textRangeEnd = textRange.duplicate();
              textRangeEnd.collapse(false);
              var textRangeStart = textRange;
              textRangeStart.collapse(true);
              var startPoint = textRangeToPoint(textRangeStart, true);
              var endPoint = textRangeToPoint(textRangeEnd, false); // same visible point case: range was collapsed.

              if (dom.isText(startPoint.node) && dom.isLeftEdgePoint(startPoint) && dom.isTextNode(endPoint.node) && dom.isRightEdgePoint(endPoint) && endPoint.node.nextSibling === startPoint.node) {
                startPoint = endPoint;
              }

              sc = startPoint.cont;
              so = startPoint.offset;
              ec = endPoint.cont;
              eo = endPoint.offset;
            }

            return new range_WrappedRange(sc, so, ec, eo);
          },

          /**
           * @method
           *
           * create WrappedRange from node
           *
           * @param {Node} node
           * @return {WrappedRange}
           */
          createFromNode: function createFromNode(node) {
            var sc = node;
            var so = 0;
            var ec = node;
            var eo = dom.nodeLength(ec); // browsers can't target a picture or void node

            if (dom.isVoid(sc)) {
              so = dom.listPrev(sc).length - 1;
              sc = sc.parentNode;
            }

            if (dom.isBR(ec)) {
              eo = dom.listPrev(ec).length - 1;
              ec = ec.parentNode;
            } else if (dom.isVoid(ec)) {
              eo = dom.listPrev(ec).length;
              ec = ec.parentNode;
            }

            return this.create(sc, so, ec, eo);
          },

          /**
           * create WrappedRange from node after position
           *
           * @param {Node} node
           * @return {WrappedRange}
           */
          createFromNodeBefore: function createFromNodeBefore(node) {
            return this.createFromNode(node).collapse(true);
          },

          /**
           * create WrappedRange from node after position
           *
           * @param {Node} node
           * @return {WrappedRange}
           */
          createFromNodeAfter: function createFromNodeAfter(node) {
            return this.createFromNode(node).collapse();
          },

          /**
           * @method
           *
           * create WrappedRange from bookmark
           *
           * @param {Node} editable
           * @param {Object} bookmark
           * @return {WrappedRange}
           */
          createFromBookmark: function createFromBookmark(editable, bookmark) {
            var sc = dom.fromOffsetPath(editable, bookmark.s.path);
            var so = bookmark.s.offset;
            var ec = dom.fromOffsetPath(editable, bookmark.e.path);
            var eo = bookmark.e.offset;
            return new range_WrappedRange(sc, so, ec, eo);
          },

          /**
           * @method
           *
           * create WrappedRange from paraBookmark
           *
           * @param {Object} bookmark
           * @param {Node[]} paras
           * @return {WrappedRange}
           */
          createFromParaBookmark: function createFromParaBookmark(bookmark, paras) {
            var so = bookmark.s.offset;
            var eo = bookmark.e.offset;
            var sc = dom.fromOffsetPath(lists.head(paras), bookmark.s.path);
            var ec = dom.fromOffsetPath(lists.last(paras), bookmark.e.path);
            return new range_WrappedRange(sc, so, ec, eo);
          }
        }; // CONCATENATED MODULE: ./src/js/base/core/key.js

        var KEY_MAP = {
          'BACKSPACE': 8,
          'TAB': 9,
          'ENTER': 13,
          'ESCAPE': 27,
          'SPACE': 32,
          'DELETE': 46,
          // Arrow
          'LEFT': 37,
          'UP': 38,
          'RIGHT': 39,
          'DOWN': 40,
          // Number: 0-9
          'NUM0': 48,
          'NUM1': 49,
          'NUM2': 50,
          'NUM3': 51,
          'NUM4': 52,
          'NUM5': 53,
          'NUM6': 54,
          'NUM7': 55,
          'NUM8': 56,
          // Alphabet: a-z
          'B': 66,
          'E': 69,
          'I': 73,
          'J': 74,
          'K': 75,
          'L': 76,
          'R': 82,
          'S': 83,
          'U': 85,
          'V': 86,
          'Y': 89,
          'Z': 90,
          'SLASH': 191,
          'LEFTBRACKET': 219,
          'BACKSLASH': 220,
          'RIGHTBRACKET': 221,
          // Navigation
          'HOME': 36,
          'END': 35,
          'PAGEUP': 33,
          'PAGEDOWN': 34
        };
        /**
         * @class core.key
         *
         * Object for keycodes.
         *
         * @singleton
         * @alternateClassName key
         */

        /* harmony default export */

        var core_key = {
          /**
           * @method isEdit
           *
           * @param {Number} keyCode
           * @return {Boolean}
           */
          isEdit: function isEdit(keyCode) {
            return lists.contains([KEY_MAP.BACKSPACE, KEY_MAP.TAB, KEY_MAP.ENTER, KEY_MAP.SPACE, KEY_MAP.DELETE], keyCode);
          },

          /**
           * @method isMove
           *
           * @param {Number} keyCode
           * @return {Boolean}
           */
          isMove: function isMove(keyCode) {
            return lists.contains([KEY_MAP.LEFT, KEY_MAP.UP, KEY_MAP.RIGHT, KEY_MAP.DOWN], keyCode);
          },

          /**
           * @method isNavigation
           *
           * @param {Number} keyCode
           * @return {Boolean}
           */
          isNavigation: function isNavigation(keyCode) {
            return lists.contains([KEY_MAP.HOME, KEY_MAP.END, KEY_MAP.PAGEUP, KEY_MAP.PAGEDOWN], keyCode);
          },

          /**
           * @property {Object} nameFromCode
           * @property {String} nameFromCode.8 "BACKSPACE"
           */
          nameFromCode: func.invertObject(KEY_MAP),
          code: KEY_MAP
        }; // CONCATENATED MODULE: ./src/js/base/core/async.js

        /**
         * @method readFileAsDataURL
         *
         * read contents of file as representing URL
         *
         * @param {File} file
         * @return {Promise} - then: dataUrl
         */

        function readFileAsDataURL(file) {
          return external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.Deferred(function (deferred) {
            external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.extend(new FileReader(), {
              onload: function onload(e) {
                var dataURL = e.target.result;
                deferred.resolve(dataURL);
              },
              onerror: function onerror(err) {
                deferred.reject(err);
              }
            }).readAsDataURL(file);
          }).promise();
        }
        /**
         * @method createImage
         *
         * create `<image>` from url string
         *
         * @param {String} url
         * @return {Promise} - then: $image
         */


        function createImage(url) {
          return external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.Deferred(function (deferred) {
            var $img = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()('<img>');
            $img.one('load', function () {
              $img.off('error abort');
              deferred.resolve($img);
            }).one('error abort', function () {
              $img.off('load').detach();
              deferred.reject($img);
            }).css({
              display: 'none'
            }).appendTo(document.body).attr('src', url);
          }).promise();
        } // CONCATENATED MODULE: ./src/js/base/editing/History.js


        function History_classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function History_defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function History_createClass(Constructor, protoProps, staticProps) {
          if (protoProps) History_defineProperties(Constructor.prototype, protoProps);
          if (staticProps) History_defineProperties(Constructor, staticProps);
          return Constructor;
        }

        var History_History = /*#__PURE__*/function () {
          function History(context) {
            History_classCallCheck(this, History);
            this.stack = [];
            this.stackOffset = -1;
            this.context = context;
            this.$editable = context.layoutInfo.editable;
            this.editable = this.$editable[0];
          }

          History_createClass(History, [{
            key: "makeSnapshot",
            value: function makeSnapshot() {
              var rng = range.create(this.editable);
              var emptyBookmark = {
                s: {
                  path: [],
                  offset: 0
                },
                e: {
                  path: [],
                  offset: 0
                }
              };
              return {
                contents: this.$editable.html(),
                bookmark: rng && rng.isOnEditable() ? rng.bookmark(this.editable) : emptyBookmark
              };
            }
          }, {
            key: "applySnapshot",
            value: function applySnapshot(snapshot) {
              if (snapshot.contents !== null) {
                this.$editable.html(snapshot.contents);
              }

              if (snapshot.bookmark !== null) {
                range.createFromBookmark(this.editable, snapshot.bookmark).select();
              }
            }
            /**
            * @method rewind
            * Rewinds the history stack back to the first snapshot taken.
            * Leaves the stack intact, so that "Redo" can still be used.
            */

          }, {
            key: "rewind",
            value: function rewind() {
              // Create snap shot if not yet recorded
              if (this.$editable.html() !== this.stack[this.stackOffset].contents) {
                this.recordUndo();
              } // Return to the first available snapshot.


              this.stackOffset = 0; // Apply that snapshot.

              this.applySnapshot(this.stack[this.stackOffset]);
            }
            /**
            *  @method commit
            *  Resets history stack, but keeps current editor's content.
            */

          }, {
            key: "commit",
            value: function commit() {
              // Clear the stack.
              this.stack = []; // Restore stackOffset to its original value.

              this.stackOffset = -1; // Record our first snapshot (of nothing).

              this.recordUndo();
            }
            /**
            * @method reset
            * Resets the history stack completely; reverting to an empty editor.
            */

          }, {
            key: "reset",
            value: function reset() {
              // Clear the stack.
              this.stack = []; // Restore stackOffset to its original value.

              this.stackOffset = -1; // Clear the editable area.

              this.$editable.html(''); // Record our first snapshot (of nothing).

              this.recordUndo();
            }
            /**
             * undo
             */

          }, {
            key: "undo",
            value: function undo() {
              // Create snap shot if not yet recorded
              if (this.$editable.html() !== this.stack[this.stackOffset].contents) {
                this.recordUndo();
              }

              if (this.stackOffset > 0) {
                this.stackOffset--;
                this.applySnapshot(this.stack[this.stackOffset]);
              }
            }
            /**
             * redo
             */

          }, {
            key: "redo",
            value: function redo() {
              if (this.stack.length - 1 > this.stackOffset) {
                this.stackOffset++;
                this.applySnapshot(this.stack[this.stackOffset]);
              }
            }
            /**
             * recorded undo
             */

          }, {
            key: "recordUndo",
            value: function recordUndo() {
              this.stackOffset++; // Wash out stack after stackOffset

              if (this.stack.length > this.stackOffset) {
                this.stack = this.stack.slice(0, this.stackOffset);
              } // Create new snapshot and push it to the end


              this.stack.push(this.makeSnapshot()); // If the stack size reachs to the limit, then slice it

              if (this.stack.length > this.context.options.historyLimit) {
                this.stack.shift();
                this.stackOffset -= 1;
              }
            }
          }]);
          return History;
        }(); // CONCATENATED MODULE: ./src/js/base/editing/Style.js


        function Style_classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function Style_defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function Style_createClass(Constructor, protoProps, staticProps) {
          if (protoProps) Style_defineProperties(Constructor.prototype, protoProps);
          if (staticProps) Style_defineProperties(Constructor, staticProps);
          return Constructor;
        }

        var Style_Style = /*#__PURE__*/function () {
          function Style() {
            Style_classCallCheck(this, Style);
          }

          Style_createClass(Style, [{
            key: "jQueryCSS",

            /**
             * @method jQueryCSS
             *
             * [workaround] for old jQuery
             * passing an array of style properties to .css()
             * will result in an object of property-value pairs.
             * (compability with version < 1.9)
             *
             * @private
             * @param  {jQuery} $obj
             * @param  {Array} propertyNames - An array of one or more CSS properties.
             * @return {Object}
             */
            value: function jQueryCSS($obj, propertyNames) {
              if (env.jqueryVersion < 1.9) {
                var result = {};
                external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.each(propertyNames, function (idx, propertyName) {
                  result[propertyName] = $obj.css(propertyName);
                });
                return result;
              }

              return $obj.css(propertyNames);
            }
            /**
             * returns style object from node
             *
             * @param {jQuery} $node
             * @return {Object}
             */

          }, {
            key: "fromNode",
            value: function fromNode($node) {
              var properties = ['font-family', 'font-size', 'text-align', 'list-style-type', 'line-height'];
              var styleInfo = this.jQueryCSS($node, properties) || {};
              var fontSize = $node[0].style.fontSize || styleInfo['font-size'];
              styleInfo['font-size'] = parseInt(fontSize, 10);
              styleInfo['font-size-unit'] = fontSize.match(/[a-z%]+$/);
              return styleInfo;
            }
            /**
             * paragraph level style
             *
             * @param {WrappedRange} rng
             * @param {Object} styleInfo
             */

          }, {
            key: "stylePara",
            value: function stylePara(rng, styleInfo) {
              external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.each(rng.nodes(dom.isPara, {
                includeAncestor: true
              }), function (idx, para) {
                external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(para).css(styleInfo);
              });
            }
            /**
             * insert and returns styleNodes on range.
             *
             * @param {WrappedRange} rng
             * @param {Object} [options] - options for styleNodes
             * @param {String} [options.nodeName] - default: `SPAN`
             * @param {Boolean} [options.expandClosestSibling] - default: `false`
             * @param {Boolean} [options.onlyPartialContains] - default: `false`
             * @return {Node[]}
             */

          }, {
            key: "styleNodes",
            value: function styleNodes(rng, options) {
              rng = rng.splitText();
              var nodeName = options && options.nodeName || 'SPAN';
              var expandClosestSibling = !!(options && options.expandClosestSibling);
              var onlyPartialContains = !!(options && options.onlyPartialContains);

              if (rng.isCollapsed()) {
                return [rng.insertNode(dom.create(nodeName))];
              }

              var pred = dom.makePredByNodeName(nodeName);
              var nodes = rng.nodes(dom.isText, {
                fullyContains: true
              }).map(function (text) {
                return dom.singleChildAncestor(text, pred) || dom.wrap(text, nodeName);
              });

              if (expandClosestSibling) {
                if (onlyPartialContains) {
                  var nodesInRange = rng.nodes(); // compose with partial contains predication

                  pred = func.and(pred, function (node) {
                    return lists.contains(nodesInRange, node);
                  });
                }

                return nodes.map(function (node) {
                  var siblings = dom.withClosestSiblings(node, pred);
                  var head = lists.head(siblings);
                  var tails = lists.tail(siblings);
                  external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.each(tails, function (idx, elem) {
                    dom.appendChildNodes(head, elem.childNodes);
                    dom.remove(elem);
                  });
                  return lists.head(siblings);
                });
              } else {
                return nodes;
              }
            }
            /**
             * get current style on cursor
             *
             * @param {WrappedRange} rng
             * @return {Object} - object contains style properties.
             */

          }, {
            key: "current",
            value: function current(rng) {
              var $cont = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(!dom.isElement(rng.sc) ? rng.sc.parentNode : rng.sc);
              var styleInfo = this.fromNode($cont); // document.queryCommandState for toggle state
              // [workaround] prevent Firefox nsresult: "0x80004005 (NS_ERROR_FAILURE)"

              try {
                styleInfo = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.extend(styleInfo, {
                  'font-bold': document.queryCommandState('bold') ? 'bold' : 'normal',
                  'font-italic': document.queryCommandState('italic') ? 'italic' : 'normal',
                  'font-underline': document.queryCommandState('underline') ? 'underline' : 'normal',
                  'font-subscript': document.queryCommandState('subscript') ? 'subscript' : 'normal',
                  'font-superscript': document.queryCommandState('superscript') ? 'superscript' : 'normal',
                  'font-strikethrough': document.queryCommandState('strikethrough') ? 'strikethrough' : 'normal',
                  'font-family': document.queryCommandValue('fontname') || styleInfo['font-family']
                });
              } catch (e) {} // eslint-disable-next-line
              // list-style-type to list-style(unordered, ordered)


              if (!rng.isOnList()) {
                styleInfo['list-style'] = 'none';
              } else {
                var orderedTypes = ['circle', 'disc', 'disc-leading-zero', 'square'];
                var isUnordered = orderedTypes.indexOf(styleInfo['list-style-type']) > -1;
                styleInfo['list-style'] = isUnordered ? 'unordered' : 'ordered';
              }

              var para = dom.ancestor(rng.sc, dom.isPara);

              if (para && para.style['line-height']) {
                styleInfo['line-height'] = para.style.lineHeight;
              } else {
                var lineHeight = parseInt(styleInfo['line-height'], 10) / parseInt(styleInfo['font-size'], 10);
                styleInfo['line-height'] = lineHeight.toFixed(1);
              }

              styleInfo.anchor = rng.isOnAnchor() && dom.ancestor(rng.sc, dom.isAnchor);
              styleInfo.ancestors = dom.listAncestor(rng.sc, dom.isEditable);
              styleInfo.range = rng;
              return styleInfo;
            }
          }]);
          return Style;
        }(); // CONCATENATED MODULE: ./src/js/base/editing/Bullet.js


        function Bullet_classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function Bullet_defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function Bullet_createClass(Constructor, protoProps, staticProps) {
          if (protoProps) Bullet_defineProperties(Constructor.prototype, protoProps);
          if (staticProps) Bullet_defineProperties(Constructor, staticProps);
          return Constructor;
        }

        var Bullet_Bullet = /*#__PURE__*/function () {
          function Bullet() {
            Bullet_classCallCheck(this, Bullet);
          }

          Bullet_createClass(Bullet, [{
            key: "insertOrderedList",

            /**
             * toggle ordered list
             */
            value: function insertOrderedList(editable) {
              this.toggleList('OL', editable);
            }
            /**
             * toggle unordered list
             */

          }, {
            key: "insertUnorderedList",
            value: function insertUnorderedList(editable) {
              this.toggleList('UL', editable);
            }
            /**
             * indent
             */

          }, {
            key: "indent",
            value: function indent(editable) {
              var _this = this;

              var rng = range.create(editable).wrapBodyInlineWithPara();
              var paras = rng.nodes(dom.isPara, {
                includeAncestor: true
              });
              var clustereds = lists.clusterBy(paras, func.peq2('parentNode'));
              external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.each(clustereds, function (idx, paras) {
                var head = lists.head(paras);

                if (dom.isLi(head)) {
                  var previousList = _this.findList(head.previousSibling);

                  if (previousList) {
                    paras.map(function (para) {
                      return previousList.appendChild(para);
                    });
                  } else {
                    _this.wrapList(paras, head.parentNode.nodeName);

                    paras.map(function (para) {
                      return para.parentNode;
                    }).map(function (para) {
                      return _this.appendToPrevious(para);
                    });
                  }
                } else {
                  external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.each(paras, function (idx, para) {
                    external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(para).css('marginLeft', function (idx, val) {
                      return (parseInt(val, 10) || 0) + 25;
                    });
                  });
                }
              });
              rng.select();
            }
            /**
             * outdent
             */

          }, {
            key: "outdent",
            value: function outdent(editable) {
              var _this2 = this;

              var rng = range.create(editable).wrapBodyInlineWithPara();
              var paras = rng.nodes(dom.isPara, {
                includeAncestor: true
              });
              var clustereds = lists.clusterBy(paras, func.peq2('parentNode'));
              external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.each(clustereds, function (idx, paras) {
                var head = lists.head(paras);

                if (dom.isLi(head)) {
                  _this2.releaseList([paras]);
                } else {
                  external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.each(paras, function (idx, para) {
                    external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(para).css('marginLeft', function (idx, val) {
                      val = parseInt(val, 10) || 0;
                      return val > 25 ? val - 25 : '';
                    });
                  });
                }
              });
              rng.select();
            }
            /**
             * toggle list
             *
             * @param {String} listName - OL or UL
             */

          }, {
            key: "toggleList",
            value: function toggleList(listName, editable) {
              var _this3 = this;

              var rng = range.create(editable).wrapBodyInlineWithPara();
              var paras = rng.nodes(dom.isPara, {
                includeAncestor: true
              });
              var bookmark = rng.paraBookmark(paras);
              var clustereds = lists.clusterBy(paras, func.peq2('parentNode')); // paragraph to list

              if (lists.find(paras, dom.isPurePara)) {
                var wrappedParas = [];
                external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.each(clustereds, function (idx, paras) {
                  wrappedParas = wrappedParas.concat(_this3.wrapList(paras, listName));
                });
                paras = wrappedParas; // list to paragraph or change list style
              } else {
                var diffLists = rng.nodes(dom.isList, {
                  includeAncestor: true
                }).filter(function (listNode) {
                  return !external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.nodeName(listNode, listName);
                });

                if (diffLists.length) {
                  external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.each(diffLists, function (idx, listNode) {
                    dom.replace(listNode, listName);
                  });
                } else {
                  paras = this.releaseList(clustereds, true);
                }
              }

              range.createFromParaBookmark(bookmark, paras).select();
            }
            /**
             * @param {Node[]} paras
             * @param {String} listName
             * @return {Node[]}
             */

          }, {
            key: "wrapList",
            value: function wrapList(paras, listName) {
              var head = lists.head(paras);
              var last = lists.last(paras);
              var prevList = dom.isList(head.previousSibling) && head.previousSibling;
              var nextList = dom.isList(last.nextSibling) && last.nextSibling;
              var listNode = prevList || dom.insertAfter(dom.create(listName || 'UL'), last); // P to LI

              paras = paras.map(function (para) {
                return dom.isPurePara(para) ? dom.replace(para, 'LI') : para;
              }); // append to list(<ul>, <ol>)

              dom.appendChildNodes(listNode, paras);

              if (nextList) {
                dom.appendChildNodes(listNode, lists.from(nextList.childNodes));
                dom.remove(nextList);
              }

              return paras;
            }
            /**
             * @method releaseList
             *
             * @param {Array[]} clustereds
             * @param {Boolean} isEscapseToBody
             * @return {Node[]}
             */

          }, {
            key: "releaseList",
            value: function releaseList(clustereds, isEscapseToBody) {
              var _this4 = this;

              var releasedParas = [];
              external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.each(clustereds, function (idx, paras) {
                var head = lists.head(paras);
                var last = lists.last(paras);
                var headList = isEscapseToBody ? dom.lastAncestor(head, dom.isList) : head.parentNode;
                var parentItem = headList.parentNode;

                if (headList.parentNode.nodeName === 'LI') {
                  paras.map(function (para) {
                    var newList = _this4.findNextSiblings(para);

                    if (parentItem.nextSibling) {
                      parentItem.parentNode.insertBefore(para, parentItem.nextSibling);
                    } else {
                      parentItem.parentNode.appendChild(para);
                    }

                    if (newList.length) {
                      _this4.wrapList(newList, headList.nodeName);

                      para.appendChild(newList[0].parentNode);
                    }
                  });

                  if (headList.children.length === 0) {
                    parentItem.removeChild(headList);
                  }

                  if (parentItem.childNodes.length === 0) {
                    parentItem.parentNode.removeChild(parentItem);
                  }
                } else {
                  var lastList = headList.childNodes.length > 1 ? dom.splitTree(headList, {
                    node: last.parentNode,
                    offset: dom.position(last) + 1
                  }, {
                    isSkipPaddingBlankHTML: true
                  }) : null;
                  var middleList = dom.splitTree(headList, {
                    node: head.parentNode,
                    offset: dom.position(head)
                  }, {
                    isSkipPaddingBlankHTML: true
                  });
                  paras = isEscapseToBody ? dom.listDescendant(middleList, dom.isLi) : lists.from(middleList.childNodes).filter(dom.isLi); // LI to P

                  if (isEscapseToBody || !dom.isList(headList.parentNode)) {
                    paras = paras.map(function (para) {
                      return dom.replace(para, 'P');
                    });
                  }

                  external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.each(lists.from(paras).reverse(), function (idx, para) {
                    dom.insertAfter(para, headList);
                  }); // remove empty lists

                  var rootLists = lists.compact([headList, middleList, lastList]);
                  external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.each(rootLists, function (idx, rootList) {
                    var listNodes = [rootList].concat(dom.listDescendant(rootList, dom.isList));
                    external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.each(listNodes.reverse(), function (idx, listNode) {
                      if (!dom.nodeLength(listNode)) {
                        dom.remove(listNode, true);
                      }
                    });
                  });
                }

                releasedParas = releasedParas.concat(paras);
              });
              return releasedParas;
            }
            /**
             * @method appendToPrevious
             *
             * Appends list to previous list item, if
             * none exist it wraps the list in a new list item.
             *
             * @param {HTMLNode} ListItem
             * @return {HTMLNode}
             */

          }, {
            key: "appendToPrevious",
            value: function appendToPrevious(node) {
              return node.previousSibling ? dom.appendChildNodes(node.previousSibling, [node]) : this.wrapList([node], 'LI');
            }
            /**
             * @method findList
             *
             * Finds an existing list in list item
             *
             * @param {HTMLNode} ListItem
             * @return {Array[]}
             */

          }, {
            key: "findList",
            value: function findList(node) {
              return node ? lists.find(node.children, function (child) {
                return ['OL', 'UL'].indexOf(child.nodeName) > -1;
              }) : null;
            }
            /**
             * @method findNextSiblings
             *
             * Finds all list item siblings that follow it
             *
             * @param {HTMLNode} ListItem
             * @return {HTMLNode}
             */

          }, {
            key: "findNextSiblings",
            value: function findNextSiblings(node) {
              var siblings = [];

              while (node.nextSibling) {
                siblings.push(node.nextSibling);
                node = node.nextSibling;
              }

              return siblings;
            }
          }]);
          return Bullet;
        }(); // CONCATENATED MODULE: ./src/js/base/editing/Typing.js


        function Typing_classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function Typing_defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function Typing_createClass(Constructor, protoProps, staticProps) {
          if (protoProps) Typing_defineProperties(Constructor.prototype, protoProps);
          if (staticProps) Typing_defineProperties(Constructor, staticProps);
          return Constructor;
        }
        /**
         * @class editing.Typing
         *
         * Typing
         *
         */


        var Typing_Typing = /*#__PURE__*/function () {
          function Typing(context) {
            Typing_classCallCheck(this, Typing); // a Bullet instance to toggle lists off

            this.bullet = new Bullet_Bullet();
            this.options = context.options;
          }
          /**
           * insert tab
           *
           * @param {WrappedRange} rng
           * @param {Number} tabsize
           */


          Typing_createClass(Typing, [{
            key: "insertTab",
            value: function insertTab(rng, tabsize) {
              var tab = dom.createText(new Array(tabsize + 1).join(dom.NBSP_CHAR));
              rng = rng.deleteContents();
              rng.insertNode(tab, true);
              rng = range.create(tab, tabsize);
              rng.select();
            }
            /**
             * insert paragraph
             *
             * @param {jQuery} $editable
             * @param {WrappedRange} rng Can be used in unit tests to "mock" the range
             *
             * blockquoteBreakingLevel
             *   0 - No break, the new paragraph remains inside the quote
             *   1 - Break the first blockquote in the ancestors list
             *   2 - Break all blockquotes, so that the new paragraph is not quoted (this is the default)
             */

          }, {
            key: "insertParagraph",
            value: function insertParagraph(editable, rng) {
              rng = rng || range.create(editable); // deleteContents on range.

              rng = rng.deleteContents(); // Wrap range if it needs to be wrapped by paragraph

              rng = rng.wrapBodyInlineWithPara(); // finding paragraph

              var splitRoot = dom.ancestor(rng.sc, dom.isPara);
              var nextPara; // on paragraph: split paragraph

              if (splitRoot) {
                // if it is an empty line with li
                if (dom.isLi(splitRoot) && (dom.isEmpty(splitRoot) || dom.deepestChildIsEmpty(splitRoot))) {
                  // toggle UL/OL and escape
                  this.bullet.toggleList(splitRoot.parentNode.nodeName);
                  return;
                } else {
                  var blockquote = null;

                  if (this.options.blockquoteBreakingLevel === 1) {
                    blockquote = dom.ancestor(splitRoot, dom.isBlockquote);
                  } else if (this.options.blockquoteBreakingLevel === 2) {
                    blockquote = dom.lastAncestor(splitRoot, dom.isBlockquote);
                  }

                  if (blockquote) {
                    // We're inside a blockquote and options ask us to break it
                    nextPara = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(dom.emptyPara)[0]; // If the split is right before a <br>, remove it so that there's no "empty line"
                    // after the split in the new blockquote created

                    if (dom.isRightEdgePoint(rng.getStartPoint()) && dom.isBR(rng.sc.nextSibling)) {
                      external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(rng.sc.nextSibling).remove();
                    }

                    var split = dom.splitTree(blockquote, rng.getStartPoint(), {
                      isDiscardEmptySplits: true
                    });

                    if (split) {
                      split.parentNode.insertBefore(nextPara, split);
                    } else {
                      dom.insertAfter(nextPara, blockquote); // There's no split if we were at the end of the blockquote
                    }
                  } else {
                    nextPara = dom.splitTree(splitRoot, rng.getStartPoint()); // not a blockquote, just insert the paragraph

                    var emptyAnchors = dom.listDescendant(splitRoot, dom.isEmptyAnchor);
                    emptyAnchors = emptyAnchors.concat(dom.listDescendant(nextPara, dom.isEmptyAnchor));
                    external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.each(emptyAnchors, function (idx, anchor) {
                      dom.remove(anchor);
                    }); // replace empty heading, pre or custom-made styleTag with P tag

                    if ((dom.isHeading(nextPara) || dom.isPre(nextPara) || dom.isCustomStyleTag(nextPara)) && dom.isEmpty(nextPara)) {
                      nextPara = dom.replace(nextPara, 'p');
                    }
                  }
                } // no paragraph: insert empty paragraph

              } else {
                var next = rng.sc.childNodes[rng.so];
                nextPara = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(dom.emptyPara)[0];

                if (next) {
                  rng.sc.insertBefore(nextPara, next);
                } else {
                  rng.sc.appendChild(nextPara);
                }
              }

              range.create(nextPara, 0).normalize().select().scrollIntoView(editable);
            }
          }]);
          return Typing;
        }(); // CONCATENATED MODULE: ./src/js/base/editing/Table.js


        function Table_classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function Table_defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function Table_createClass(Constructor, protoProps, staticProps) {
          if (protoProps) Table_defineProperties(Constructor.prototype, protoProps);
          if (staticProps) Table_defineProperties(Constructor, staticProps);
          return Constructor;
        }
        /**
         * @class Create a virtual table to create what actions to do in change.
         * @param {object} startPoint Cell selected to apply change.
         * @param {enum} where  Where change will be applied Row or Col. Use enum: TableResultAction.where
         * @param {enum} action Action to be applied. Use enum: TableResultAction.requestAction
         * @param {object} domTable Dom element of table to make changes.
         */


        var TableResultAction = function TableResultAction(startPoint, where, action, domTable) {
          var _startPoint = {
            'colPos': 0,
            'rowPos': 0
          };
          var _virtualTable = [];
          var _actionCellList = []; /// ///////////////////////////////////////////
          // Private functions
          /// ///////////////////////////////////////////

          /**
           * Set the startPoint of action.
           */

          function setStartPoint() {
            if (!startPoint || !startPoint.tagName || startPoint.tagName.toLowerCase() !== 'td' && startPoint.tagName.toLowerCase() !== 'th') {
              // Impossible to identify start Cell point
              return;
            }

            _startPoint.colPos = startPoint.cellIndex;

            if (!startPoint.parentElement || !startPoint.parentElement.tagName || startPoint.parentElement.tagName.toLowerCase() !== 'tr') {
              // Impossible to identify start Row point
              return;
            }

            _startPoint.rowPos = startPoint.parentElement.rowIndex;
          }
          /**
           * Define virtual table position info object.
           *
           * @param {int} rowIndex Index position in line of virtual table.
           * @param {int} cellIndex Index position in column of virtual table.
           * @param {object} baseRow Row affected by this position.
           * @param {object} baseCell Cell affected by this position.
           * @param {bool} isSpan Inform if it is an span cell/row.
           */


          function setVirtualTablePosition(rowIndex, cellIndex, baseRow, baseCell, isRowSpan, isColSpan, isVirtualCell) {
            var objPosition = {
              'baseRow': baseRow,
              'baseCell': baseCell,
              'isRowSpan': isRowSpan,
              'isColSpan': isColSpan,
              'isVirtual': isVirtualCell
            };

            if (!_virtualTable[rowIndex]) {
              _virtualTable[rowIndex] = [];
            }

            _virtualTable[rowIndex][cellIndex] = objPosition;
          }
          /**
           * Create action cell object.
           *
           * @param {object} virtualTableCellObj Object of specific position on virtual table.
           * @param {enum} resultAction Action to be applied in that item.
           */


          function getActionCell(virtualTableCellObj, resultAction, virtualRowPosition, virtualColPosition) {
            return {
              'baseCell': virtualTableCellObj.baseCell,
              'action': resultAction,
              'virtualTable': {
                'rowIndex': virtualRowPosition,
                'cellIndex': virtualColPosition
              }
            };
          }
          /**
           * Recover free index of row to append Cell.
           *
           * @param {int} rowIndex Index of row to find free space.
           * @param {int} cellIndex Index of cell to find free space in table.
           */


          function recoverCellIndex(rowIndex, cellIndex) {
            if (!_virtualTable[rowIndex]) {
              return cellIndex;
            }

            if (!_virtualTable[rowIndex][cellIndex]) {
              return cellIndex;
            }

            var newCellIndex = cellIndex;

            while (_virtualTable[rowIndex][newCellIndex]) {
              newCellIndex++;

              if (!_virtualTable[rowIndex][newCellIndex]) {
                return newCellIndex;
              }
            }
          }
          /**
           * Recover info about row and cell and add information to virtual table.
           *
           * @param {object} row Row to recover information.
           * @param {object} cell Cell to recover information.
           */


          function addCellInfoToVirtual(row, cell) {
            var cellIndex = recoverCellIndex(row.rowIndex, cell.cellIndex);
            var cellHasColspan = cell.colSpan > 1;
            var cellHasRowspan = cell.rowSpan > 1;
            var isThisSelectedCell = row.rowIndex === _startPoint.rowPos && cell.cellIndex === _startPoint.colPos;
            setVirtualTablePosition(row.rowIndex, cellIndex, row, cell, cellHasRowspan, cellHasColspan, false); // Add span rows to virtual Table.

            var rowspanNumber = cell.attributes.rowSpan ? parseInt(cell.attributes.rowSpan.value, 10) : 0;

            if (rowspanNumber > 1) {
              for (var rp = 1; rp < rowspanNumber; rp++) {
                var rowspanIndex = row.rowIndex + rp;
                adjustStartPoint(rowspanIndex, cellIndex, cell, isThisSelectedCell);
                setVirtualTablePosition(rowspanIndex, cellIndex, row, cell, true, cellHasColspan, true);
              }
            } // Add span cols to virtual table.


            var colspanNumber = cell.attributes.colSpan ? parseInt(cell.attributes.colSpan.value, 10) : 0;

            if (colspanNumber > 1) {
              for (var cp = 1; cp < colspanNumber; cp++) {
                var cellspanIndex = recoverCellIndex(row.rowIndex, cellIndex + cp);
                adjustStartPoint(row.rowIndex, cellspanIndex, cell, isThisSelectedCell);
                setVirtualTablePosition(row.rowIndex, cellspanIndex, row, cell, cellHasRowspan, true, true);
              }
            }
          }
          /**
           * Process validation and adjust of start point if needed
           *
           * @param {int} rowIndex
           * @param {int} cellIndex
           * @param {object} cell
           * @param {bool} isSelectedCell
           */


          function adjustStartPoint(rowIndex, cellIndex, cell, isSelectedCell) {
            if (rowIndex === _startPoint.rowPos && _startPoint.colPos >= cell.cellIndex && cell.cellIndex <= cellIndex && !isSelectedCell) {
              _startPoint.colPos++;
            }
          }
          /**
           * Create virtual table of cells with all cells, including span cells.
           */


          function createVirtualTable() {
            var rows = domTable.rows;

            for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
              var cells = rows[rowIndex].cells;

              for (var cellIndex = 0; cellIndex < cells.length; cellIndex++) {
                addCellInfoToVirtual(rows[rowIndex], cells[cellIndex]);
              }
            }
          }
          /**
           * Get action to be applied on the cell.
           *
           * @param {object} cell virtual table cell to apply action
           */


          function getDeleteResultActionToCell(cell) {
            switch (where) {
              case TableResultAction.where.Column:
                if (cell.isColSpan) {
                  return TableResultAction.resultAction.SubtractSpanCount;
                }

                break;

              case TableResultAction.where.Row:
                if (!cell.isVirtual && cell.isRowSpan) {
                  return TableResultAction.resultAction.AddCell;
                } else if (cell.isRowSpan) {
                  return TableResultAction.resultAction.SubtractSpanCount;
                }

                break;
            }

            return TableResultAction.resultAction.RemoveCell;
          }
          /**
           * Get action to be applied on the cell.
           *
           * @param {object} cell virtual table cell to apply action
           */


          function getAddResultActionToCell(cell) {
            switch (where) {
              case TableResultAction.where.Column:
                if (cell.isColSpan) {
                  return TableResultAction.resultAction.SumSpanCount;
                } else if (cell.isRowSpan && cell.isVirtual) {
                  return TableResultAction.resultAction.Ignore;
                }

                break;

              case TableResultAction.where.Row:
                if (cell.isRowSpan) {
                  return TableResultAction.resultAction.SumSpanCount;
                } else if (cell.isColSpan && cell.isVirtual) {
                  return TableResultAction.resultAction.Ignore;
                }

                break;
            }

            return TableResultAction.resultAction.AddCell;
          }

          function init() {
            setStartPoint();
            createVirtualTable();
          } /// ///////////////////////////////////////////
          // Public functions
          /// ///////////////////////////////////////////

          /**
           * Recover array os what to do in table.
           */


          this.getActionList = function () {
            var fixedRow = where === TableResultAction.where.Row ? _startPoint.rowPos : -1;
            var fixedCol = where === TableResultAction.where.Column ? _startPoint.colPos : -1;
            var actualPosition = 0;
            var canContinue = true;

            while (canContinue) {
              var rowPosition = fixedRow >= 0 ? fixedRow : actualPosition;
              var colPosition = fixedCol >= 0 ? fixedCol : actualPosition;
              var row = _virtualTable[rowPosition];

              if (!row) {
                canContinue = false;
                return _actionCellList;
              }

              var cell = row[colPosition];

              if (!cell) {
                canContinue = false;
                return _actionCellList;
              } // Define action to be applied in this cell


              var resultAction = TableResultAction.resultAction.Ignore;

              switch (action) {
                case TableResultAction.requestAction.Add:
                  resultAction = getAddResultActionToCell(cell);
                  break;

                case TableResultAction.requestAction.Delete:
                  resultAction = getDeleteResultActionToCell(cell);
                  break;
              }

              _actionCellList.push(getActionCell(cell, resultAction, rowPosition, colPosition));

              actualPosition++;
            }

            return _actionCellList;
          };

          init();
        };
        /**
        *
        * Where action occours enum.
        */


        TableResultAction.where = {
          'Row': 0,
          'Column': 1
        };
        /**
        *
        * Requested action to apply enum.
        */

        TableResultAction.requestAction = {
          'Add': 0,
          'Delete': 1
        };
        /**
        *
        * Result action to be executed enum.
        */

        TableResultAction.resultAction = {
          'Ignore': 0,
          'SubtractSpanCount': 1,
          'RemoveCell': 2,
          'AddCell': 3,
          'SumSpanCount': 4
        };
        /**
         *
         * @class editing.Table
         *
         * Table
         *
         */

        var Table_Table = /*#__PURE__*/function () {
          function Table() {
            Table_classCallCheck(this, Table);
          }

          Table_createClass(Table, [{
            key: "tab",

            /**
             * handle tab key
             *
             * @param {WrappedRange} rng
             * @param {Boolean} isShift
             */
            value: function tab(rng, isShift) {
              var cell = dom.ancestor(rng.commonAncestor(), dom.isCell);
              var table = dom.ancestor(cell, dom.isTable);
              var cells = dom.listDescendant(table, dom.isCell);
              var nextCell = lists[isShift ? 'prev' : 'next'](cells, cell);

              if (nextCell) {
                range.create(nextCell, 0).select();
              }
            }
            /**
             * Add a new row
             *
             * @param {WrappedRange} rng
             * @param {String} position (top/bottom)
             * @return {Node}
             */

          }, {
            key: "addRow",
            value: function addRow(rng, position) {
              var cell = dom.ancestor(rng.commonAncestor(), dom.isCell);
              var currentTr = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(cell).closest('tr');
              var trAttributes = this.recoverAttributes(currentTr);
              var html = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()('<tr' + trAttributes + '></tr>');
              var vTable = new TableResultAction(cell, TableResultAction.where.Row, TableResultAction.requestAction.Add, external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(currentTr).closest('table')[0]);
              var actions = vTable.getActionList();

              for (var idCell = 0; idCell < actions.length; idCell++) {
                var currentCell = actions[idCell];
                var tdAttributes = this.recoverAttributes(currentCell.baseCell);

                switch (currentCell.action) {
                  case TableResultAction.resultAction.AddCell:
                    html.append('<td' + tdAttributes + '>' + dom.blank + '</td>');
                    break;

                  case TableResultAction.resultAction.SumSpanCount:
                    {
                      if (position === 'top') {
                        var baseCellTr = currentCell.baseCell.parent;
                        var isTopFromRowSpan = (!baseCellTr ? 0 : currentCell.baseCell.closest('tr').rowIndex) <= currentTr[0].rowIndex;

                        if (isTopFromRowSpan) {
                          var newTd = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()('<div></div>').append(external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()('<td' + tdAttributes + '>' + dom.blank + '</td>').removeAttr('rowspan')).html();
                          html.append(newTd);
                          break;
                        }
                      }

                      var rowspanNumber = parseInt(currentCell.baseCell.rowSpan, 10);
                      rowspanNumber++;
                      currentCell.baseCell.setAttribute('rowSpan', rowspanNumber);
                    }
                    break;
                }
              }

              if (position === 'top') {
                currentTr.before(html);
              } else {
                var cellHasRowspan = cell.rowSpan > 1;

                if (cellHasRowspan) {
                  var lastTrIndex = currentTr[0].rowIndex + (cell.rowSpan - 2);
                  external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(currentTr).parent().find('tr')[lastTrIndex]).after(external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(html));
                  return;
                }

                currentTr.after(html);
              }
            }
            /**
             * Add a new col
             *
             * @param {WrappedRange} rng
             * @param {String} position (left/right)
             * @return {Node}
             */

          }, {
            key: "addCol",
            value: function addCol(rng, position) {
              var cell = dom.ancestor(rng.commonAncestor(), dom.isCell);
              var row = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(cell).closest('tr');
              var rowsGroup = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(row).siblings();
              rowsGroup.push(row);
              var vTable = new TableResultAction(cell, TableResultAction.where.Column, TableResultAction.requestAction.Add, external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(row).closest('table')[0]);
              var actions = vTable.getActionList();

              for (var actionIndex = 0; actionIndex < actions.length; actionIndex++) {
                var currentCell = actions[actionIndex];
                var tdAttributes = this.recoverAttributes(currentCell.baseCell);

                switch (currentCell.action) {
                  case TableResultAction.resultAction.AddCell:
                    if (position === 'right') {
                      external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(currentCell.baseCell).after('<td' + tdAttributes + '>' + dom.blank + '</td>');
                    } else {
                      external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(currentCell.baseCell).before('<td' + tdAttributes + '>' + dom.blank + '</td>');
                    }

                    break;

                  case TableResultAction.resultAction.SumSpanCount:
                    if (position === 'right') {
                      var colspanNumber = parseInt(currentCell.baseCell.colSpan, 10);
                      colspanNumber++;
                      currentCell.baseCell.setAttribute('colSpan', colspanNumber);
                    } else {
                      external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(currentCell.baseCell).before('<td' + tdAttributes + '>' + dom.blank + '</td>');
                    }

                    break;
                }
              }
            }
            /*
            * Copy attributes from element.
            *
            * @param {object} Element to recover attributes.
            * @return {string} Copied string elements.
            */

          }, {
            key: "recoverAttributes",
            value: function recoverAttributes(el) {
              var resultStr = '';

              if (!el) {
                return resultStr;
              }

              var attrList = el.attributes || [];

              for (var i = 0; i < attrList.length; i++) {
                if (attrList[i].name.toLowerCase() === 'id') {
                  continue;
                }

                if (attrList[i].specified) {
                  resultStr += ' ' + attrList[i].name + '=\'' + attrList[i].value + '\'';
                }
              }

              return resultStr;
            }
            /**
             * Delete current row
             *
             * @param {WrappedRange} rng
             * @return {Node}
             */

          }, {
            key: "deleteRow",
            value: function deleteRow(rng) {
              var cell = dom.ancestor(rng.commonAncestor(), dom.isCell);
              var row = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(cell).closest('tr');
              var cellPos = row.children('td, th').index(external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(cell));
              var rowPos = row[0].rowIndex;
              var vTable = new TableResultAction(cell, TableResultAction.where.Row, TableResultAction.requestAction.Delete, external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(row).closest('table')[0]);
              var actions = vTable.getActionList();

              for (var actionIndex = 0; actionIndex < actions.length; actionIndex++) {
                if (!actions[actionIndex]) {
                  continue;
                }

                var baseCell = actions[actionIndex].baseCell;
                var virtualPosition = actions[actionIndex].virtualTable;
                var hasRowspan = baseCell.rowSpan && baseCell.rowSpan > 1;
                var rowspanNumber = hasRowspan ? parseInt(baseCell.rowSpan, 10) : 0;

                switch (actions[actionIndex].action) {
                  case TableResultAction.resultAction.Ignore:
                    continue;

                  case TableResultAction.resultAction.AddCell:
                    {
                      var nextRow = row.next('tr')[0];

                      if (!nextRow) {
                        continue;
                      }

                      var cloneRow = row[0].cells[cellPos];

                      if (hasRowspan) {
                        if (rowspanNumber > 2) {
                          rowspanNumber--;
                          nextRow.insertBefore(cloneRow, nextRow.cells[cellPos]);
                          nextRow.cells[cellPos].setAttribute('rowSpan', rowspanNumber);
                          nextRow.cells[cellPos].innerHTML = '';
                        } else if (rowspanNumber === 2) {
                          nextRow.insertBefore(cloneRow, nextRow.cells[cellPos]);
                          nextRow.cells[cellPos].removeAttribute('rowSpan');
                          nextRow.cells[cellPos].innerHTML = '';
                        }
                      }
                    }
                    continue;

                  case TableResultAction.resultAction.SubtractSpanCount:
                    if (hasRowspan) {
                      if (rowspanNumber > 2) {
                        rowspanNumber--;
                        baseCell.setAttribute('rowSpan', rowspanNumber);

                        if (virtualPosition.rowIndex !== rowPos && baseCell.cellIndex === cellPos) {
                          baseCell.innerHTML = '';
                        }
                      } else if (rowspanNumber === 2) {
                        baseCell.removeAttribute('rowSpan');

                        if (virtualPosition.rowIndex !== rowPos && baseCell.cellIndex === cellPos) {
                          baseCell.innerHTML = '';
                        }
                      }
                    }

                    continue;

                  case TableResultAction.resultAction.RemoveCell:
                    // Do not need remove cell because row will be deleted.
                    continue;
                }
              }

              row.remove();
            }
            /**
             * Delete current col
             *
             * @param {WrappedRange} rng
             * @return {Node}
             */

          }, {
            key: "deleteCol",
            value: function deleteCol(rng) {
              var cell = dom.ancestor(rng.commonAncestor(), dom.isCell);
              var row = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(cell).closest('tr');
              var cellPos = row.children('td, th').index(external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(cell));
              var vTable = new TableResultAction(cell, TableResultAction.where.Column, TableResultAction.requestAction.Delete, external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(row).closest('table')[0]);
              var actions = vTable.getActionList();

              for (var actionIndex = 0; actionIndex < actions.length; actionIndex++) {
                if (!actions[actionIndex]) {
                  continue;
                }

                switch (actions[actionIndex].action) {
                  case TableResultAction.resultAction.Ignore:
                    continue;

                  case TableResultAction.resultAction.SubtractSpanCount:
                    {
                      var baseCell = actions[actionIndex].baseCell;
                      var hasColspan = baseCell.colSpan && baseCell.colSpan > 1;

                      if (hasColspan) {
                        var colspanNumber = baseCell.colSpan ? parseInt(baseCell.colSpan, 10) : 0;

                        if (colspanNumber > 2) {
                          colspanNumber--;
                          baseCell.setAttribute('colSpan', colspanNumber);

                          if (baseCell.cellIndex === cellPos) {
                            baseCell.innerHTML = '';
                          }
                        } else if (colspanNumber === 2) {
                          baseCell.removeAttribute('colSpan');

                          if (baseCell.cellIndex === cellPos) {
                            baseCell.innerHTML = '';
                          }
                        }
                      }
                    }
                    continue;

                  case TableResultAction.resultAction.RemoveCell:
                    dom.remove(actions[actionIndex].baseCell, true);
                    continue;
                }
              }
            }
            /**
             * create empty table element
             *
             * @param {Number} rowCount
             * @param {Number} colCount
             * @return {Node}
             */

          }, {
            key: "createTable",
            value: function createTable(colCount, rowCount, options) {
              var tds = [];
              var tdHTML;

              for (var idxCol = 0; idxCol < colCount; idxCol++) {
                tds.push('<td>' + dom.blank + '</td>');
              }

              tdHTML = tds.join('');
              var trs = [];
              var trHTML;

              for (var idxRow = 0; idxRow < rowCount; idxRow++) {
                trs.push('<tr>' + tdHTML + '</tr>');
              }

              trHTML = trs.join('');
              var $table = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()('<table>' + trHTML + '</table>');

              if (options && options.tableClassName) {
                $table.addClass(options.tableClassName);
              }

              return $table[0];
            }
            /**
             * Delete current table
             *
             * @param {WrappedRange} rng
             * @return {Node}
             */

          }, {
            key: "deleteTable",
            value: function deleteTable(rng) {
              var cell = dom.ancestor(rng.commonAncestor(), dom.isCell);
              external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(cell).closest('table').remove();
            }
          }]);
          return Table;
        }(); // CONCATENATED MODULE: ./src/js/base/module/Editor.js


        function Editor_classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function Editor_defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function Editor_createClass(Constructor, protoProps, staticProps) {
          if (protoProps) Editor_defineProperties(Constructor.prototype, protoProps);
          if (staticProps) Editor_defineProperties(Constructor, staticProps);
          return Constructor;
        }

        var KEY_BOGUS = 'bogus';
        /**
         * @class Editor
         */

        var Editor_Editor = /*#__PURE__*/function () {
          function Editor(context) {
            var _this = this;

            Editor_classCallCheck(this, Editor);
            this.context = context;
            this.$note = context.layoutInfo.note;
            this.$editor = context.layoutInfo.editor;
            this.$editable = context.layoutInfo.editable;
            this.options = context.options;
            this.lang = this.options.langInfo;
            this.editable = this.$editable[0];
            this.lastRange = null;
            this.snapshot = null;
            this.style = new Style_Style();
            this.table = new Table_Table();
            this.typing = new Typing_Typing(context);
            this.bullet = new Bullet_Bullet();
            this.history = new History_History(context);
            this.context.memo('help.escape', this.lang.help.escape);
            this.context.memo('help.undo', this.lang.help.undo);
            this.context.memo('help.redo', this.lang.help.redo);
            this.context.memo('help.tab', this.lang.help.tab);
            this.context.memo('help.untab', this.lang.help.untab);
            this.context.memo('help.insertParagraph', this.lang.help.insertParagraph);
            this.context.memo('help.insertOrderedList', this.lang.help.insertOrderedList);
            this.context.memo('help.insertUnorderedList', this.lang.help.insertUnorderedList);
            this.context.memo('help.indent', this.lang.help.indent);
            this.context.memo('help.outdent', this.lang.help.outdent);
            this.context.memo('help.formatPara', this.lang.help.formatPara);
            this.context.memo('help.insertHorizontalRule', this.lang.help.insertHorizontalRule);
            this.context.memo('help.fontName', this.lang.help.fontName); // native commands(with execCommand), generate function for execCommand

            var commands = ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'formatBlock', 'removeFormat', 'backColor'];

            for (var idx = 0, len = commands.length; idx < len; idx++) {
              this[commands[idx]] = function (sCmd) {
                return function (value) {
                  _this.beforeCommand();

                  document.execCommand(sCmd, false, value);

                  _this.afterCommand(true);
                };
              }(commands[idx]);

              this.context.memo('help.' + commands[idx], this.lang.help[commands[idx]]);
            }

            this.fontName = this.wrapCommand(function (value) {
              return _this.fontStyling('font-family', env.validFontName(value));
            });
            this.fontSize = this.wrapCommand(function (value) {
              var unit = _this.currentStyle()['font-size-unit'];

              return _this.fontStyling('font-size', value + unit);
            });
            this.fontSizeUnit = this.wrapCommand(function (value) {
              var size = _this.currentStyle()['font-size'];

              return _this.fontStyling('font-size', size + value);
            });

            for (var _idx = 1; _idx <= 6; _idx++) {
              this['formatH' + _idx] = function (idx) {
                return function () {
                  _this.formatBlock('H' + idx);
                };
              }(_idx);

              this.context.memo('help.formatH' + _idx, this.lang.help['formatH' + _idx]);
            }

            this.insertParagraph = this.wrapCommand(function () {
              _this.typing.insertParagraph(_this.editable);
            });
            this.insertOrderedList = this.wrapCommand(function () {
              _this.bullet.insertOrderedList(_this.editable);
            });
            this.insertUnorderedList = this.wrapCommand(function () {
              _this.bullet.insertUnorderedList(_this.editable);
            });
            this.indent = this.wrapCommand(function () {
              _this.bullet.indent(_this.editable);
            });
            this.outdent = this.wrapCommand(function () {
              _this.bullet.outdent(_this.editable);
            });
            /**
             * insertNode
             * insert node
             * @param {Node} node
             */

            this.insertNode = this.wrapCommand(function (node) {
              if (_this.isLimited(external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(node).text().length)) {
                return;
              }

              var rng = _this.getLastRange();

              rng.insertNode(node);

              _this.setLastRange(range.createFromNodeAfter(node).select());
            });
            /**
             * insert text
             * @param {String} text
             */

            this.insertText = this.wrapCommand(function (text) {
              if (_this.isLimited(text.length)) {
                return;
              }

              var rng = _this.getLastRange();

              var textNode = rng.insertNode(dom.createText(text));

              _this.setLastRange(range.create(textNode, dom.nodeLength(textNode)).select());
            });
            /**
             * paste HTML
             * @param {String} markup
             */

            this.pasteHTML = this.wrapCommand(function (markup) {
              if (_this.isLimited(markup.length)) {
                return;
              }

              markup = _this.context.invoke('codeview.purify', markup);

              var contents = _this.getLastRange().pasteHTML(markup);

              _this.setLastRange(range.createFromNodeAfter(lists.last(contents)).select());
            });
            /**
             * formatBlock
             *
             * @param {String} tagName
             */

            this.formatBlock = this.wrapCommand(function (tagName, $target) {
              var onApplyCustomStyle = _this.options.callbacks.onApplyCustomStyle;

              if (onApplyCustomStyle) {
                onApplyCustomStyle.call(_this, $target, _this.context, _this.onFormatBlock);
              } else {
                _this.onFormatBlock(tagName, $target);
              }
            });
            /**
             * insert horizontal rule
             */

            this.insertHorizontalRule = this.wrapCommand(function () {
              var hrNode = _this.getLastRange().insertNode(dom.create('HR'));

              if (hrNode.nextSibling) {
                _this.setLastRange(range.create(hrNode.nextSibling, 0).normalize().select());
              }
            });
            /**
             * lineHeight
             * @param {String} value
             */

            this.lineHeight = this.wrapCommand(function (value) {
              _this.style.stylePara(_this.getLastRange(), {
                lineHeight: value
              });
            });
            /**
             * create link (command)
             *
             * @param {Object} linkInfo
             */

            this.createLink = this.wrapCommand(function (linkInfo) {
              var linkUrl = linkInfo.url;
              var linkText = linkInfo.text;
              var isNewWindow = linkInfo.isNewWindow;
              var checkProtocol = linkInfo.checkProtocol;

              var rng = linkInfo.range || _this.getLastRange();

              var additionalTextLength = linkText.length - rng.toString().length;

              if (additionalTextLength > 0 && _this.isLimited(additionalTextLength)) {
                return;
              }

              var isTextChanged = rng.toString() !== linkText; // handle spaced urls from input

              if (typeof linkUrl === 'string') {
                linkUrl = linkUrl.trim();
              }

              if (_this.options.onCreateLink) {
                linkUrl = _this.options.onCreateLink(linkUrl);
              } else if (checkProtocol) {
                // if url doesn't have any protocol and not even a relative or a label, use http:// as default
                linkUrl = /^([A-Za-z][A-Za-z0-9+-.]*\:|#|\/)/.test(linkUrl) ? linkUrl : _this.options.defaultProtocol + linkUrl;
              }

              var anchors = [];

              if (isTextChanged) {
                rng = rng.deleteContents();
                var anchor = rng.insertNode(external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()('<A>' + linkText + '</A>')[0]);
                anchors.push(anchor);
              } else {
                anchors = _this.style.styleNodes(rng, {
                  nodeName: 'A',
                  expandClosestSibling: true,
                  onlyPartialContains: true
                });
              }

              external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.each(anchors, function (idx, anchor) {
                external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(anchor).attr('href', linkUrl);

                if (isNewWindow) {
                  external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(anchor).attr('target', '_blank');
                } else {
                  external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(anchor).removeAttr('target');
                }
              });

              _this.setLastRange(_this.createRangeFromList(anchors).select());
            });
            /**
             * setting color
             *
             * @param {Object} sObjColor  color code
             * @param {String} sObjColor.foreColor foreground color
             * @param {String} sObjColor.backColor background color
             */

            this.color = this.wrapCommand(function (colorInfo) {
              var foreColor = colorInfo.foreColor;
              var backColor = colorInfo.backColor;

              if (foreColor) {
                document.execCommand('foreColor', false, foreColor);
              }

              if (backColor) {
                document.execCommand('backColor', false, backColor);
              }
            });
            /**
             * Set foreground color
             *
             * @param {String} colorCode foreground color code
             */

            this.foreColor = this.wrapCommand(function (colorInfo) {
              document.execCommand('foreColor', false, colorInfo);
            });
            /**
             * insert Table
             *
             * @param {String} dimension of table (ex : "5x5")
             */

            this.insertTable = this.wrapCommand(function (dim) {
              var dimension = dim.split('x');

              var rng = _this.getLastRange().deleteContents();

              rng.insertNode(_this.table.createTable(dimension[0], dimension[1], _this.options));
            });
            /**
             * remove media object and Figure Elements if media object is img with Figure.
             */

            this.removeMedia = this.wrapCommand(function () {
              var $target = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(_this.restoreTarget()).parent();

              if ($target.closest('figure').length) {
                $target.closest('figure').remove();
              } else {
                $target = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(_this.restoreTarget()).detach();
              }

              _this.context.triggerEvent('media.delete', $target, _this.$editable);
            });
            /**
             * float me
             *
             * @param {String} value
             */

            this.floatMe = this.wrapCommand(function (value) {
              var $target = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(_this.restoreTarget());
              $target.toggleClass('note-float-left', value === 'left');
              $target.toggleClass('note-float-right', value === 'right');
              $target.css('float', value === 'none' ? '' : value);
            });
            /**
             * resize overlay element
             * @param {String} value
             */

            this.resize = this.wrapCommand(function (value) {
              var $target = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(_this.restoreTarget());
              value = parseFloat(value);

              if (value === 0) {
                $target.css('width', '');
              } else {
                $target.css({
                  width: value * 100 + '%',
                  height: ''
                });
              }
            });
          }

          Editor_createClass(Editor, [{
            key: "initialize",
            value: function initialize() {
              var _this2 = this; // bind custom events


              this.$editable.on('keydown', function (event) {
                if (event.keyCode === core_key.code.ENTER) {
                  _this2.context.triggerEvent('enter', event);
                }

                _this2.context.triggerEvent('keydown', event); // keep a snapshot to limit text on input event


                _this2.snapshot = _this2.history.makeSnapshot();
                _this2.hasKeyShortCut = false;

                if (!event.isDefaultPrevented()) {
                  if (_this2.options.shortcuts) {
                    _this2.hasKeyShortCut = _this2.handleKeyMap(event);
                  } else {
                    _this2.preventDefaultEditableShortCuts(event);
                  }
                }

                if (_this2.isLimited(1, event)) {
                  var lastRange = _this2.getLastRange();

                  if (lastRange.eo - lastRange.so === 0) {
                    return false;
                  }
                }

                _this2.setLastRange(); // record undo in the key event except keyMap.


                if (_this2.options.recordEveryKeystroke) {
                  if (_this2.hasKeyShortCut === false) {
                    _this2.history.recordUndo();
                  }
                }
              }).on('keyup', function (event) {
                _this2.setLastRange();

                _this2.context.triggerEvent('keyup', event);
              }).on('focus', function (event) {
                _this2.setLastRange();

                _this2.context.triggerEvent('focus', event);
              }).on('blur', function (event) {
                _this2.context.triggerEvent('blur', event);
              }).on('mousedown', function (event) {
                _this2.context.triggerEvent('mousedown', event);
              }).on('mouseup', function (event) {
                _this2.setLastRange();

                _this2.history.recordUndo();

                _this2.context.triggerEvent('mouseup', event);
              }).on('scroll', function (event) {
                _this2.context.triggerEvent('scroll', event);
              }).on('paste', function (event) {
                _this2.setLastRange();

                _this2.context.triggerEvent('paste', event);
              }).on('input', function () {
                // To limit composition characters (e.g. Korean)
                if (_this2.isLimited(0) && _this2.snapshot) {
                  _this2.history.applySnapshot(_this2.snapshot);
                }
              });
              this.$editable.attr('spellcheck', this.options.spellCheck);
              this.$editable.attr('autocorrect', this.options.spellCheck);

              if (this.options.disableGrammar) {
                this.$editable.attr('data-gramm', false);
              } // init content before set event


              this.$editable.html(dom.html(this.$note) || dom.emptyPara);
              this.$editable.on(env.inputEventName, func.debounce(function () {
                _this2.context.triggerEvent('change', _this2.$editable.html(), _this2.$editable);
              }, 10));
              this.$editable.on('focusin', function (event) {
                _this2.context.triggerEvent('focusin', event);
              }).on('focusout', function (event) {
                _this2.context.triggerEvent('focusout', event);
              });

              if (this.options.airMode) {
                if (this.options.overrideContextMenu) {
                  this.$editor.on('contextmenu', function (event) {
                    _this2.context.triggerEvent('contextmenu', event);

                    return false;
                  });
                }
              } else {
                if (this.options.width) {
                  this.$editor.outerWidth(this.options.width);
                }

                if (this.options.height) {
                  this.$editable.outerHeight(this.options.height);
                }

                if (this.options.maxHeight) {
                  this.$editable.css('max-height', this.options.maxHeight);
                }

                if (this.options.minHeight) {
                  this.$editable.css('min-height', this.options.minHeight);
                }
              }

              this.history.recordUndo();
              this.setLastRange();
            }
          }, {
            key: "destroy",
            value: function destroy() {
              this.$editable.off();
            }
          }, {
            key: "handleKeyMap",
            value: function handleKeyMap(event) {
              var keyMap = this.options.keyMap[env.isMac ? 'mac' : 'pc'];
              var keys = [];

              if (event.metaKey) {
                keys.push('CMD');
              }

              if (event.ctrlKey && !event.altKey) {
                keys.push('CTRL');
              }

              if (event.shiftKey) {
                keys.push('SHIFT');
              }

              var keyName = core_key.nameFromCode[event.keyCode];

              if (keyName) {
                keys.push(keyName);
              }

              var eventName = keyMap[keys.join('+')];

              if (keyName === 'TAB' && !this.options.tabDisable) {
                this.afterCommand();
              } else if (eventName) {
                if (this.context.invoke(eventName) !== false) {
                  event.preventDefault(); // if keyMap action was invoked

                  return true;
                }
              } else if (core_key.isEdit(event.keyCode)) {
                this.afterCommand();
              }

              return false;
            }
          }, {
            key: "preventDefaultEditableShortCuts",
            value: function preventDefaultEditableShortCuts(event) {
              // B(Bold, 66) / I(Italic, 73) / U(Underline, 85)
              if ((event.ctrlKey || event.metaKey) && lists.contains([66, 73, 85], event.keyCode)) {
                event.preventDefault();
              }
            }
          }, {
            key: "isLimited",
            value: function isLimited(pad, event) {
              pad = pad || 0;

              if (typeof event !== 'undefined') {
                if (core_key.isMove(event.keyCode) || core_key.isNavigation(event.keyCode) || event.ctrlKey || event.metaKey || lists.contains([core_key.code.BACKSPACE, core_key.code.DELETE], event.keyCode)) {
                  return false;
                }
              }

              if (this.options.maxTextLength > 0) {
                if (this.$editable.text().length + pad > this.options.maxTextLength) {
                  return true;
                }
              }

              return false;
            }
            /**
             * create range
             * @return {WrappedRange}
             */

          }, {
            key: "createRange",
            value: function createRange() {
              this.focus();
              this.setLastRange();
              return this.getLastRange();
            }
            /**
             * create a new range from the list of elements
             *
             * @param {list} dom element list
             * @return {WrappedRange}
             */

          }, {
            key: "createRangeFromList",
            value: function createRangeFromList(lst) {
              var startRange = range.createFromNodeBefore(lists.head(lst));
              var startPoint = startRange.getStartPoint();
              var endRange = range.createFromNodeAfter(lists.last(lst));
              var endPoint = endRange.getEndPoint();
              return range.create(startPoint.node, startPoint.offset, endPoint.node, endPoint.offset);
            }
            /**
             * set the last range
             *
             * if given rng is exist, set rng as the last range
             * or create a new range at the end of the document
             *
             * @param {WrappedRange} rng
             */

          }, {
            key: "setLastRange",
            value: function setLastRange(rng) {
              if (rng) {
                this.lastRange = rng;
              } else {
                this.lastRange = range.create(this.editable);

                if (external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(this.lastRange.sc).closest('.note-editable').length === 0) {
                  this.lastRange = range.createFromBodyElement(this.editable);
                }
              }
            }
            /**
             * get the last range
             *
             * if there is a saved last range, return it
             * or create a new range and return it
             *
             * @return {WrappedRange}
             */

          }, {
            key: "getLastRange",
            value: function getLastRange() {
              if (!this.lastRange) {
                this.setLastRange();
              }

              return this.lastRange;
            }
            /**
             * saveRange
             *
             * save current range
             *
             * @param {Boolean} [thenCollapse=false]
             */

          }, {
            key: "saveRange",
            value: function saveRange(thenCollapse) {
              if (thenCollapse) {
                this.getLastRange().collapse().select();
              }
            }
            /**
             * restoreRange
             *
             * restore lately range
             */

          }, {
            key: "restoreRange",
            value: function restoreRange() {
              if (this.lastRange) {
                this.lastRange.select();
                this.focus();
              }
            }
          }, {
            key: "saveTarget",
            value: function saveTarget(node) {
              this.$editable.data('target', node);
            }
          }, {
            key: "clearTarget",
            value: function clearTarget() {
              this.$editable.removeData('target');
            }
          }, {
            key: "restoreTarget",
            value: function restoreTarget() {
              return this.$editable.data('target');
            }
            /**
             * currentStyle
             *
             * current style
             * @return {Object|Boolean} unfocus
             */

          }, {
            key: "currentStyle",
            value: function currentStyle() {
              var rng = range.create();

              if (rng) {
                rng = rng.normalize();
              }

              return rng ? this.style.current(rng) : this.style.fromNode(this.$editable);
            }
            /**
             * style from node
             *
             * @param {jQuery} $node
             * @return {Object}
             */

          }, {
            key: "styleFromNode",
            value: function styleFromNode($node) {
              return this.style.fromNode($node);
            }
            /**
             * undo
             */

          }, {
            key: "undo",
            value: function undo() {
              this.context.triggerEvent('before.command', this.$editable.html());
              this.history.undo();
              this.context.triggerEvent('change', this.$editable.html(), this.$editable);
            }
            /*
            * commit
            */

          }, {
            key: "commit",
            value: function commit() {
              this.context.triggerEvent('before.command', this.$editable.html());
              this.history.commit();
              this.context.triggerEvent('change', this.$editable.html(), this.$editable);
            }
            /**
             * redo
             */

          }, {
            key: "redo",
            value: function redo() {
              this.context.triggerEvent('before.command', this.$editable.html());
              this.history.redo();
              this.context.triggerEvent('change', this.$editable.html(), this.$editable);
            }
            /**
             * before command
             */

          }, {
            key: "beforeCommand",
            value: function beforeCommand() {
              this.context.triggerEvent('before.command', this.$editable.html()); // Set styleWithCSS before run a command

              document.execCommand('styleWithCSS', false, this.options.styleWithCSS); // keep focus on editable before command execution

              this.focus();
            }
            /**
             * after command
             * @param {Boolean} isPreventTrigger
             */

          }, {
            key: "afterCommand",
            value: function afterCommand(isPreventTrigger) {
              this.normalizeContent();
              this.history.recordUndo();

              if (!isPreventTrigger) {
                this.context.triggerEvent('change', this.$editable.html(), this.$editable);
              }
            }
            /**
             * handle tab key
             */

          }, {
            key: "tab",
            value: function tab() {
              var rng = this.getLastRange();

              if (rng.isCollapsed() && rng.isOnCell()) {
                this.table.tab(rng);
              } else {
                if (this.options.tabSize === 0) {
                  return false;
                }

                if (!this.isLimited(this.options.tabSize)) {
                  this.beforeCommand();
                  this.typing.insertTab(rng, this.options.tabSize);
                  this.afterCommand();
                }
              }
            }
            /**
             * handle shift+tab key
             */

          }, {
            key: "untab",
            value: function untab() {
              var rng = this.getLastRange();

              if (rng.isCollapsed() && rng.isOnCell()) {
                this.table.tab(rng, true);
              } else {
                if (this.options.tabSize === 0) {
                  return false;
                }
              }
            }
            /**
             * run given function between beforeCommand and afterCommand
             */

          }, {
            key: "wrapCommand",
            value: function wrapCommand(fn) {
              return function () {
                this.beforeCommand();
                fn.apply(this, arguments);
                this.afterCommand();
              };
            }
            /**
             * insert image
             *
             * @param {String} src
             * @param {String|Function} param
             * @return {Promise}
             */

          }, {
            key: "insertImage",
            value: function insertImage(src, param) {
              var _this3 = this;

              return createImage(src, param).then(function ($image) {
                _this3.beforeCommand();

                if (typeof param === 'function') {
                  param($image);
                } else {
                  if (typeof param === 'string') {
                    $image.attr('data-filename', param);
                  }

                  $image.css('width', Math.min(_this3.$editable.width(), $image.width()));
                }

                $image.show();

                _this3.getLastRange().insertNode($image[0]);

                _this3.setLastRange(range.createFromNodeAfter($image[0]).select());

                _this3.afterCommand();
              }).fail(function (e) {
                _this3.context.triggerEvent('image.upload.error', e);
              });
            }
            /**
             * insertImages
             * @param {File[]} files
             */

          }, {
            key: "insertImagesAsDataURL",
            value: function insertImagesAsDataURL(files) {
              var _this4 = this;

              external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.each(files, function (idx, file) {
                var filename = file.name;

                if (_this4.options.maximumImageFileSize && _this4.options.maximumImageFileSize < file.size) {
                  _this4.context.triggerEvent('image.upload.error', _this4.lang.image.maximumFileSizeError);
                } else {
                  readFileAsDataURL(file).then(function (dataURL) {
                    return _this4.insertImage(dataURL, filename);
                  }).fail(function () {
                    _this4.context.triggerEvent('image.upload.error');
                  });
                }
              });
            }
            /**
             * insertImagesOrCallback
             * @param {File[]} files
             */

          }, {
            key: "insertImagesOrCallback",
            value: function insertImagesOrCallback(files) {
              var callbacks = this.options.callbacks; // If onImageUpload set,

              if (callbacks.onImageUpload) {
                this.context.triggerEvent('image.upload', files); // else insert Image as dataURL
              } else {
                this.insertImagesAsDataURL(files);
              }
            }
            /**
             * return selected plain text
             * @return {String} text
             */

          }, {
            key: "getSelectedText",
            value: function getSelectedText() {
              var rng = this.getLastRange(); // if range on anchor, expand range with anchor

              if (rng.isOnAnchor()) {
                rng = range.createFromNode(dom.ancestor(rng.sc, dom.isAnchor));
              }

              return rng.toString();
            }
          }, {
            key: "onFormatBlock",
            value: function onFormatBlock(tagName, $target) {
              // [workaround] for MSIE, IE need `<`
              document.execCommand('FormatBlock', false, env.isMSIE ? '<' + tagName + '>' : tagName); // support custom class

              if ($target && $target.length) {
                // find the exact element has given tagName
                if ($target[0].tagName.toUpperCase() !== tagName.toUpperCase()) {
                  $target = $target.find(tagName);
                }

                if ($target && $target.length) {
                  var className = $target[0].className || '';

                  if (className) {
                    var currentRange = this.createRange();
                    var $parent = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()([currentRange.sc, currentRange.ec]).closest(tagName);
                    $parent.addClass(className);
                  }
                }
              }
            }
          }, {
            key: "formatPara",
            value: function formatPara() {
              this.formatBlock('P');
            }
          }, {
            key: "fontStyling",
            value: function fontStyling(target, value) {
              var rng = this.getLastRange();

              if (rng !== '') {
                var spans = this.style.styleNodes(rng);
                this.$editor.find('.note-status-output').html('');
                external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(spans).css(target, value); // [workaround] added styled bogus span for style
                //  - also bogus character needed for cursor position

                if (rng.isCollapsed()) {
                  var firstSpan = lists.head(spans);

                  if (firstSpan && !dom.nodeLength(firstSpan)) {
                    firstSpan.innerHTML = dom.ZERO_WIDTH_NBSP_CHAR;
                    range.createFromNode(firstSpan.firstChild).select();
                    this.setLastRange();
                    this.$editable.data(KEY_BOGUS, firstSpan);
                  }
                } else {
                  this.setLastRange(this.createRangeFromList(spans).select());
                }
              } else {
                var noteStatusOutput = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.now();
                this.$editor.find('.note-status-output').html('<div id="note-status-output-' + noteStatusOutput + '" class="alert alert-info">' + this.lang.output.noSelection + '</div>');
                setTimeout(function () {
                  external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()('#note-status-output-' + noteStatusOutput).remove();
                }, 5000);
              }
            }
            /**
             * unlink
             *
             * @type command
             */

          }, {
            key: "unlink",
            value: function unlink() {
              var rng = this.getLastRange();

              if (rng.isOnAnchor()) {
                var anchor = dom.ancestor(rng.sc, dom.isAnchor);
                rng = range.createFromNode(anchor);
                rng.select();
                this.setLastRange();
                this.beforeCommand();
                document.execCommand('unlink');
                this.afterCommand();
              }
            }
            /**
             * returns link info
             *
             * @return {Object}
             * @return {WrappedRange} return.range
             * @return {String} return.text
             * @return {Boolean} [return.isNewWindow=true]
             * @return {String} [return.url=""]
             */

          }, {
            key: "getLinkInfo",
            value: function getLinkInfo() {
              var rng = this.getLastRange().expand(dom.isAnchor); // Get the first anchor on range(for edit).

              var $anchor = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(lists.head(rng.nodes(dom.isAnchor)));
              var linkInfo = {
                range: rng,
                text: rng.toString(),
                url: $anchor.length ? $anchor.attr('href') : ''
              }; // When anchor exists,

              if ($anchor.length) {
                // Set isNewWindow by checking its target.
                linkInfo.isNewWindow = $anchor.attr('target') === '_blank';
              }

              return linkInfo;
            }
          }, {
            key: "addRow",
            value: function addRow(position) {
              var rng = this.getLastRange(this.$editable);

              if (rng.isCollapsed() && rng.isOnCell()) {
                this.beforeCommand();
                this.table.addRow(rng, position);
                this.afterCommand();
              }
            }
          }, {
            key: "addCol",
            value: function addCol(position) {
              var rng = this.getLastRange(this.$editable);

              if (rng.isCollapsed() && rng.isOnCell()) {
                this.beforeCommand();
                this.table.addCol(rng, position);
                this.afterCommand();
              }
            }
          }, {
            key: "deleteRow",
            value: function deleteRow() {
              var rng = this.getLastRange(this.$editable);

              if (rng.isCollapsed() && rng.isOnCell()) {
                this.beforeCommand();
                this.table.deleteRow(rng);
                this.afterCommand();
              }
            }
          }, {
            key: "deleteCol",
            value: function deleteCol() {
              var rng = this.getLastRange(this.$editable);

              if (rng.isCollapsed() && rng.isOnCell()) {
                this.beforeCommand();
                this.table.deleteCol(rng);
                this.afterCommand();
              }
            }
          }, {
            key: "deleteTable",
            value: function deleteTable() {
              var rng = this.getLastRange(this.$editable);

              if (rng.isCollapsed() && rng.isOnCell()) {
                this.beforeCommand();
                this.table.deleteTable(rng);
                this.afterCommand();
              }
            }
            /**
             * @param {Position} pos
             * @param {jQuery} $target - target element
             * @param {Boolean} [bKeepRatio] - keep ratio
             */

          }, {
            key: "resizeTo",
            value: function resizeTo(pos, $target, bKeepRatio) {
              var imageSize;

              if (bKeepRatio) {
                var newRatio = pos.y / pos.x;
                var ratio = $target.data('ratio');
                imageSize = {
                  width: ratio > newRatio ? pos.x : pos.y / ratio,
                  height: ratio > newRatio ? pos.x * ratio : pos.y
                };
              } else {
                imageSize = {
                  width: pos.x,
                  height: pos.y
                };
              }

              $target.css(imageSize);
            }
            /**
             * returns whether editable area has focus or not.
             */

          }, {
            key: "hasFocus",
            value: function hasFocus() {
              return this.$editable.is(':focus');
            }
            /**
             * set focus
             */

          }, {
            key: "focus",
            value: function focus() {
              // [workaround] Screen will move when page is scolled in IE.
              //  - do focus when not focused
              if (!this.hasFocus()) {
                this.$editable.focus();
              }
            }
            /**
             * returns whether contents is empty or not.
             * @return {Boolean}
             */

          }, {
            key: "isEmpty",
            value: function isEmpty() {
              return dom.isEmpty(this.$editable[0]) || dom.emptyPara === this.$editable.html();
            }
            /**
             * Removes all contents and restores the editable instance to an _emptyPara_.
             */

          }, {
            key: "empty",
            value: function empty() {
              this.context.invoke('code', dom.emptyPara);
            }
            /**
             * normalize content
             */

          }, {
            key: "normalizeContent",
            value: function normalizeContent() {
              this.$editable[0].normalize();
            }
          }]);
          return Editor;
        }(); // CONCATENATED MODULE: ./src/js/base/module/Clipboard.js


        function Clipboard_classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function Clipboard_defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function Clipboard_createClass(Constructor, protoProps, staticProps) {
          if (protoProps) Clipboard_defineProperties(Constructor.prototype, protoProps);
          if (staticProps) Clipboard_defineProperties(Constructor, staticProps);
          return Constructor;
        }

        var Clipboard_Clipboard = /*#__PURE__*/function () {
          function Clipboard(context) {
            Clipboard_classCallCheck(this, Clipboard);
            this.context = context;
            this.$editable = context.layoutInfo.editable;
          }

          Clipboard_createClass(Clipboard, [{
            key: "initialize",
            value: function initialize() {
              this.$editable.on('paste', this.pasteByEvent.bind(this));
            }
            /**
             * paste by clipboard event
             *
             * @param {Event} event
             */

          }, {
            key: "pasteByEvent",
            value: function pasteByEvent(event) {
              var _this = this;

              var clipboardData = event.originalEvent.clipboardData;

              if (clipboardData && clipboardData.items && clipboardData.items.length) {
                var item = clipboardData.items.length > 1 ? clipboardData.items[1] : lists.head(clipboardData.items);

                if (item.kind === 'file' && item.type.indexOf('image/') !== -1) {
                  // paste img file
                  this.context.invoke('editor.insertImagesOrCallback', [item.getAsFile()]);
                  event.preventDefault();
                } else if (item.kind === 'string') {
                  // paste text with maxTextLength check
                  if (this.context.invoke('editor.isLimited', clipboardData.getData('Text').length)) {
                    event.preventDefault();
                  }
                }
              } else if (window.clipboardData) {
                // for IE
                var text = window.clipboardData.getData('text');

                if (this.context.invoke('editor.isLimited', text.length)) {
                  event.preventDefault();
                }
              } // Call editor.afterCommand after proceeding default event handler


              setTimeout(function () {
                _this.context.invoke('editor.afterCommand');
              }, 10);
            }
          }]);
          return Clipboard;
        }(); // CONCATENATED MODULE: ./src/js/base/module/Dropzone.js


        function Dropzone_classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function Dropzone_defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function Dropzone_createClass(Constructor, protoProps, staticProps) {
          if (protoProps) Dropzone_defineProperties(Constructor.prototype, protoProps);
          if (staticProps) Dropzone_defineProperties(Constructor, staticProps);
          return Constructor;
        }

        var Dropzone_Dropzone = /*#__PURE__*/function () {
          function Dropzone(context) {
            Dropzone_classCallCheck(this, Dropzone);
            this.context = context;
            this.$eventListener = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(document);
            this.$editor = context.layoutInfo.editor;
            this.$editable = context.layoutInfo.editable;
            this.options = context.options;
            this.lang = this.options.langInfo;
            this.documentEventHandlers = {};
            this.$dropzone = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(['<div class="note-dropzone">', '<div class="note-dropzone-message"></div>', '</div>'].join('')).prependTo(this.$editor);
          }
          /**
           * attach Drag and Drop Events
           */


          Dropzone_createClass(Dropzone, [{
            key: "initialize",
            value: function initialize() {
              if (this.options.disableDragAndDrop) {
                // prevent default drop event
                this.documentEventHandlers.onDrop = function (e) {
                  e.preventDefault();
                }; // do not consider outside of dropzone


                this.$eventListener = this.$dropzone;
                this.$eventListener.on('drop', this.documentEventHandlers.onDrop);
              } else {
                this.attachDragAndDropEvent();
              }
            }
            /**
             * attach Drag and Drop Events
             */

          }, {
            key: "attachDragAndDropEvent",
            value: function attachDragAndDropEvent() {
              var _this = this;

              var collection = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()();
              var $dropzoneMessage = this.$dropzone.find('.note-dropzone-message');

              this.documentEventHandlers.onDragenter = function (e) {
                var isCodeview = _this.context.invoke('codeview.isActivated');

                var hasEditorSize = _this.$editor.width() > 0 && _this.$editor.height() > 0;

                if (!isCodeview && !collection.length && hasEditorSize) {
                  _this.$editor.addClass('dragover');

                  _this.$dropzone.width(_this.$editor.width());

                  _this.$dropzone.height(_this.$editor.height());

                  $dropzoneMessage.text(_this.lang.image.dragImageHere);
                }

                collection = collection.add(e.target);
              };

              this.documentEventHandlers.onDragleave = function (e) {
                collection = collection.not(e.target); // If nodeName is BODY, then just make it over (fix for IE)

                if (!collection.length || e.target.nodeName === 'BODY') {
                  collection = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()();

                  _this.$editor.removeClass('dragover');
                }
              };

              this.documentEventHandlers.onDrop = function () {
                collection = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()();

                _this.$editor.removeClass('dragover');
              }; // show dropzone on dragenter when dragging a object to document
              // -but only if the editor is visible, i.e. has a positive width and height


              this.$eventListener.on('dragenter', this.documentEventHandlers.onDragenter).on('dragleave', this.documentEventHandlers.onDragleave).on('drop', this.documentEventHandlers.onDrop); // change dropzone's message on hover.

              this.$dropzone.on('dragenter', function () {
                _this.$dropzone.addClass('hover');

                $dropzoneMessage.text(_this.lang.image.dropImage);
              }).on('dragleave', function () {
                _this.$dropzone.removeClass('hover');

                $dropzoneMessage.text(_this.lang.image.dragImageHere);
              }); // attach dropImage

              this.$dropzone.on('drop', function (event) {
                var dataTransfer = event.originalEvent.dataTransfer; // stop the browser from opening the dropped content

                event.preventDefault();

                if (dataTransfer && dataTransfer.files && dataTransfer.files.length) {
                  _this.$editable.focus();

                  _this.context.invoke('editor.insertImagesOrCallback', dataTransfer.files);
                } else {
                  external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.each(dataTransfer.types, function (idx, type) {
                    // skip moz-specific types
                    if (type.toLowerCase().indexOf('_moz_') > -1) {
                      return;
                    }

                    var content = dataTransfer.getData(type);

                    if (type.toLowerCase().indexOf('text') > -1) {
                      _this.context.invoke('editor.pasteHTML', content);
                    } else {
                      external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(content).each(function (idx, item) {
                        _this.context.invoke('editor.insertNode', item);
                      });
                    }
                  });
                }
              }).on('dragover', false); // prevent default dragover event
            }
          }, {
            key: "destroy",
            value: function destroy() {
              var _this2 = this;

              Object.keys(this.documentEventHandlers).forEach(function (key) {
                _this2.$eventListener.off(key.substr(2).toLowerCase(), _this2.documentEventHandlers[key]);
              });
              this.documentEventHandlers = {};
            }
          }]);
          return Dropzone;
        }(); // CONCATENATED MODULE: ./src/js/base/module/Codeview.js


        function _createForOfIteratorHelper(o) {
          if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
            if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) {
              var i = 0;

              var F = function F() {};

              return {
                s: F,
                n: function n() {
                  if (i >= o.length) return {
                    done: true
                  };
                  return {
                    done: false,
                    value: o[i++]
                  };
                },
                e: function e(_e) {
                  throw _e;
                },
                f: F
              };
            }

            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }

          var it,
              normalCompletion = true,
              didErr = false,
              err;
          return {
            s: function s() {
              it = o[Symbol.iterator]();
            },
            n: function n() {
              var step = it.next();
              normalCompletion = step.done;
              return step;
            },
            e: function e(_e2) {
              didErr = true;
              err = _e2;
            },
            f: function f() {
              try {
                if (!normalCompletion && it["return"] != null) it["return"]();
              } finally {
                if (didErr) throw err;
              }
            }
          };
        }

        function _unsupportedIterableToArray(o, minLen) {
          if (!o) return;
          if (typeof o === "string") return _arrayLikeToArray(o, minLen);
          var n = Object.prototype.toString.call(o).slice(8, -1);
          if (n === "Object" && o.constructor) n = o.constructor.name;
          if (n === "Map" || n === "Set") return Array.from(n);
          if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
        }

        function _arrayLikeToArray(arr, len) {
          if (len == null || len > arr.length) len = arr.length;

          for (var i = 0, arr2 = new Array(len); i < len; i++) {
            arr2[i] = arr[i];
          }

          return arr2;
        }

        function Codeview_classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function Codeview_defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function Codeview_createClass(Constructor, protoProps, staticProps) {
          if (protoProps) Codeview_defineProperties(Constructor.prototype, protoProps);
          if (staticProps) Codeview_defineProperties(Constructor, staticProps);
          return Constructor;
        }
        /**
         * @class Codeview
         */


        var Codeview_CodeView = /*#__PURE__*/function () {
          function CodeView(context) {
            Codeview_classCallCheck(this, CodeView);
            this.context = context;
            this.$editor = context.layoutInfo.editor;
            this.$editable = context.layoutInfo.editable;
            this.$codable = context.layoutInfo.codable;
            this.options = context.options;
            this.CodeMirrorConstructor = window.CodeMirror;

            if (this.options.codemirror.CodeMirrorConstructor) {
              this.CodeMirrorConstructor = this.options.codemirror.CodeMirrorConstructor;
            }
          }

          Codeview_createClass(CodeView, [{
            key: "sync",
            value: function sync(html) {
              var isCodeview = this.isActivated();
              var CodeMirror = this.CodeMirrorConstructor;

              if (isCodeview) {
                if (html) {
                  if (CodeMirror) {
                    this.$codable.data('cmEditor').getDoc().setValue(html);
                  } else {
                    this.$codable.val(html);
                  }
                } else {
                  if (CodeMirror) {
                    this.$codable.data('cmEditor').save();
                  }
                }
              }
            }
          }, {
            key: "initialize",
            value: function initialize() {
              var _this = this;

              this.$codable.on('keyup', function (event) {
                if (event.keyCode === core_key.code.ESCAPE) {
                  _this.deactivate();
                }
              });
            }
            /**
             * @return {Boolean}
             */

          }, {
            key: "isActivated",
            value: function isActivated() {
              return this.$editor.hasClass('codeview');
            }
            /**
             * toggle codeview
             */

          }, {
            key: "toggle",
            value: function toggle() {
              if (this.isActivated()) {
                this.deactivate();
              } else {
                this.activate();
              }

              this.context.triggerEvent('codeview.toggled');
            }
            /**
             * purify input value
             * @param value
             * @returns {*}
             */

          }, {
            key: "purify",
            value: function purify(value) {
              if (this.options.codeviewFilter) {
                // filter code view regex
                value = value.replace(this.options.codeviewFilterRegex, ''); // allow specific iframe tag

                if (this.options.codeviewIframeFilter) {
                  var whitelist = this.options.codeviewIframeWhitelistSrc.concat(this.options.codeviewIframeWhitelistSrcBase);
                  value = value.replace(/(<iframe.*?>.*?(?:<\/iframe>)?)/gi, function (tag) {
                    // remove if src attribute is duplicated
                    if (/<.+src(?==?('|"|\s)?)[\s\S]+src(?=('|"|\s)?)[^>]*?>/i.test(tag)) {
                      return '';
                    }

                    var _iterator = _createForOfIteratorHelper(whitelist),
                        _step;

                    try {
                      for (_iterator.s(); !(_step = _iterator.n()).done;) {
                        var src = _step.value; // pass if src is trusted

                        if (new RegExp('src="(https?:)?\/\/' + src.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '\/(.+)"').test(tag)) {
                          return tag;
                        }
                      }
                    } catch (err) {
                      _iterator.e(err);
                    } finally {
                      _iterator.f();
                    }

                    return '';
                  });
                }
              }

              return value;
            }
            /**
             * activate code view
             */

          }, {
            key: "activate",
            value: function activate() {
              var _this2 = this;

              var CodeMirror = this.CodeMirrorConstructor;
              this.$codable.val(dom.html(this.$editable, this.options.prettifyHtml));
              this.$codable.height(this.$editable.height());
              this.context.invoke('toolbar.updateCodeview', true);
              this.context.invoke('airPopover.updateCodeview', true);
              this.$editor.addClass('codeview');
              this.$codable.focus(); // activate CodeMirror as codable

              if (CodeMirror) {
                var cmEditor = CodeMirror.fromTextArea(this.$codable[0], this.options.codemirror); // CodeMirror TernServer

                if (this.options.codemirror.tern) {
                  var server = new CodeMirror.TernServer(this.options.codemirror.tern);
                  cmEditor.ternServer = server;
                  cmEditor.on('cursorActivity', function (cm) {
                    server.updateArgHints(cm);
                  });
                }

                cmEditor.on('blur', function (event) {
                  _this2.context.triggerEvent('blur.codeview', cmEditor.getValue(), event);
                });
                cmEditor.on('change', function () {
                  _this2.context.triggerEvent('change.codeview', cmEditor.getValue(), cmEditor);
                }); // CodeMirror hasn't Padding.

                cmEditor.setSize(null, this.$editable.outerHeight());
                this.$codable.data('cmEditor', cmEditor);
              } else {
                this.$codable.on('blur', function (event) {
                  _this2.context.triggerEvent('blur.codeview', _this2.$codable.val(), event);
                });
                this.$codable.on('input', function () {
                  _this2.context.triggerEvent('change.codeview', _this2.$codable.val(), _this2.$codable);
                });
              }
            }
            /**
             * deactivate code view
             */

          }, {
            key: "deactivate",
            value: function deactivate() {
              var CodeMirror = this.CodeMirrorConstructor; // deactivate CodeMirror as codable

              if (CodeMirror) {
                var cmEditor = this.$codable.data('cmEditor');
                this.$codable.val(cmEditor.getValue());
                cmEditor.toTextArea();
              }

              var value = this.purify(dom.value(this.$codable, this.options.prettifyHtml) || dom.emptyPara);
              var isChange = this.$editable.html() !== value;
              this.$editable.html(value);
              this.$editable.height(this.options.height ? this.$codable.height() : 'auto');
              this.$editor.removeClass('codeview');

              if (isChange) {
                this.context.triggerEvent('change', this.$editable.html(), this.$editable);
              }

              this.$editable.focus();
              this.context.invoke('toolbar.updateCodeview', false);
              this.context.invoke('airPopover.updateCodeview', false);
            }
          }, {
            key: "destroy",
            value: function destroy() {
              if (this.isActivated()) {
                this.deactivate();
              }
            }
          }]);
          return CodeView;
        }(); // CONCATENATED MODULE: ./src/js/base/module/Statusbar.js


        function Statusbar_classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function Statusbar_defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function Statusbar_createClass(Constructor, protoProps, staticProps) {
          if (protoProps) Statusbar_defineProperties(Constructor.prototype, protoProps);
          if (staticProps) Statusbar_defineProperties(Constructor, staticProps);
          return Constructor;
        }

        var EDITABLE_PADDING = 24;

        var Statusbar_Statusbar = /*#__PURE__*/function () {
          function Statusbar(context) {
            Statusbar_classCallCheck(this, Statusbar);
            this.$document = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(document);
            this.$statusbar = context.layoutInfo.statusbar;
            this.$editable = context.layoutInfo.editable;
            this.options = context.options;
          }

          Statusbar_createClass(Statusbar, [{
            key: "initialize",
            value: function initialize() {
              var _this = this;

              if (this.options.airMode || this.options.disableResizeEditor) {
                this.destroy();
                return;
              }

              this.$statusbar.on('mousedown', function (event) {
                event.preventDefault();
                event.stopPropagation();

                var editableTop = _this.$editable.offset().top - _this.$document.scrollTop();

                var onMouseMove = function onMouseMove(event) {
                  var height = event.clientY - (editableTop + EDITABLE_PADDING);
                  height = _this.options.minheight > 0 ? Math.max(height, _this.options.minheight) : height;
                  height = _this.options.maxHeight > 0 ? Math.min(height, _this.options.maxHeight) : height;

                  _this.$editable.height(height);
                };

                _this.$document.on('mousemove', onMouseMove).one('mouseup', function () {
                  _this.$document.off('mousemove', onMouseMove);
                });
              });
            }
          }, {
            key: "destroy",
            value: function destroy() {
              this.$statusbar.off();
              this.$statusbar.addClass('locked');
            }
          }]);
          return Statusbar;
        }(); // CONCATENATED MODULE: ./src/js/base/module/Fullscreen.js


        function Fullscreen_classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function Fullscreen_defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function Fullscreen_createClass(Constructor, protoProps, staticProps) {
          if (protoProps) Fullscreen_defineProperties(Constructor.prototype, protoProps);
          if (staticProps) Fullscreen_defineProperties(Constructor, staticProps);
          return Constructor;
        }

        var Fullscreen_Fullscreen = /*#__PURE__*/function () {
          function Fullscreen(context) {
            var _this = this;

            Fullscreen_classCallCheck(this, Fullscreen);
            this.context = context;
            this.$editor = context.layoutInfo.editor;
            this.$toolbar = context.layoutInfo.toolbar;
            this.$editable = context.layoutInfo.editable;
            this.$codable = context.layoutInfo.codable;
            this.$window = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(window);
            this.$scrollbar = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()('html, body');

            this.onResize = function () {
              _this.resizeTo({
                h: _this.$window.height() - _this.$toolbar.outerHeight()
              });
            };
          }

          Fullscreen_createClass(Fullscreen, [{
            key: "resizeTo",
            value: function resizeTo(size) {
              this.$editable.css('height', size.h);
              this.$codable.css('height', size.h);

              if (this.$codable.data('cmeditor')) {
                this.$codable.data('cmeditor').setsize(null, size.h);
              }
            }
            /**
             * toggle fullscreen
             */

          }, {
            key: "toggle",
            value: function toggle() {
              this.$editor.toggleClass('fullscreen');

              if (this.isFullscreen()) {
                this.$editable.data('orgHeight', this.$editable.css('height'));
                this.$editable.data('orgMaxHeight', this.$editable.css('maxHeight'));
                this.$editable.css('maxHeight', '');
                this.$window.on('resize', this.onResize).trigger('resize');
                this.$scrollbar.css('overflow', 'hidden');
              } else {
                this.$window.off('resize', this.onResize);
                this.resizeTo({
                  h: this.$editable.data('orgHeight')
                });
                this.$editable.css('maxHeight', this.$editable.css('orgMaxHeight'));
                this.$scrollbar.css('overflow', 'visible');
              }

              this.context.invoke('toolbar.updateFullscreen', this.isFullscreen());
            }
          }, {
            key: "isFullscreen",
            value: function isFullscreen() {
              return this.$editor.hasClass('fullscreen');
            }
          }]);
          return Fullscreen;
        }(); // CONCATENATED MODULE: ./src/js/base/module/Handle.js


        function Handle_classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function Handle_defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function Handle_createClass(Constructor, protoProps, staticProps) {
          if (protoProps) Handle_defineProperties(Constructor.prototype, protoProps);
          if (staticProps) Handle_defineProperties(Constructor, staticProps);
          return Constructor;
        }

        var Handle_Handle = /*#__PURE__*/function () {
          function Handle(context) {
            var _this = this;

            Handle_classCallCheck(this, Handle);
            this.context = context;
            this.$document = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(document);
            this.$editingArea = context.layoutInfo.editingArea;
            this.options = context.options;
            this.lang = this.options.langInfo;
            this.events = {
              'summernote.mousedown': function summernoteMousedown(we, e) {
                if (_this.update(e.target, e)) {
                  e.preventDefault();
                }
              },
              'summernote.keyup summernote.scroll summernote.change summernote.dialog.shown': function summernoteKeyupSummernoteScrollSummernoteChangeSummernoteDialogShown() {
                _this.update();
              },
              'summernote.disable summernote.blur': function summernoteDisableSummernoteBlur() {
                _this.hide();
              },
              'summernote.codeview.toggled': function summernoteCodeviewToggled() {
                _this.update();
              }
            };
          }

          Handle_createClass(Handle, [{
            key: "initialize",
            value: function initialize() {
              var _this2 = this;

              this.$handle = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(['<div class="note-handle">', '<div class="note-control-selection">', '<div class="note-control-selection-bg"></div>', '<div class="note-control-holder note-control-nw"></div>', '<div class="note-control-holder note-control-ne"></div>', '<div class="note-control-holder note-control-sw"></div>', '<div class="', this.options.disableResizeImage ? 'note-control-holder' : 'note-control-sizing', ' note-control-se"></div>', this.options.disableResizeImage ? '' : '<div class="note-control-selection-info"></div>', '</div>', '</div>'].join('')).prependTo(this.$editingArea);
              this.$handle.on('mousedown', function (event) {
                if (dom.isControlSizing(event.target)) {
                  event.preventDefault();
                  event.stopPropagation();

                  var $target = _this2.$handle.find('.note-control-selection').data('target');

                  var posStart = $target.offset();

                  var scrollTop = _this2.$document.scrollTop();

                  var onMouseMove = function onMouseMove(event) {
                    _this2.context.invoke('editor.resizeTo', {
                      x: event.clientX - posStart.left,
                      y: event.clientY - (posStart.top - scrollTop)
                    }, $target, !event.shiftKey);

                    _this2.update($target[0], event);
                  };

                  _this2.$document.on('mousemove', onMouseMove).one('mouseup', function (e) {
                    e.preventDefault();

                    _this2.$document.off('mousemove', onMouseMove);

                    _this2.context.invoke('editor.afterCommand');
                  });

                  if (!$target.data('ratio')) {
                    // original ratio.
                    $target.data('ratio', $target.height() / $target.width());
                  }
                }
              }); // Listen for scrolling on the handle overlay.

              this.$handle.on('wheel', function (e) {
                e.preventDefault();

                _this2.update();
              });
            }
          }, {
            key: "destroy",
            value: function destroy() {
              this.$handle.remove();
            }
          }, {
            key: "update",
            value: function update(target, event) {
              if (this.context.isDisabled()) {
                return false;
              }

              var isImage = dom.isImg(target);
              var $selection = this.$handle.find('.note-control-selection');
              this.context.invoke('imagePopover.update', target, event);

              if (isImage) {
                var $image = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(target);
                var position = $image.position();
                var pos = {
                  left: position.left + parseInt($image.css('marginLeft'), 10),
                  top: position.top + parseInt($image.css('marginTop'), 10)
                }; // exclude margin

                var imageSize = {
                  w: $image.outerWidth(false),
                  h: $image.outerHeight(false)
                };
                $selection.css({
                  display: 'block',
                  left: pos.left,
                  top: pos.top,
                  width: imageSize.w,
                  height: imageSize.h
                }).data('target', $image); // save current image element.

                var origImageObj = new Image();
                origImageObj.src = $image.attr('src');
                var sizingText = imageSize.w + 'x' + imageSize.h + ' (' + this.lang.image.original + ': ' + origImageObj.width + 'x' + origImageObj.height + ')';
                $selection.find('.note-control-selection-info').text(sizingText);
                this.context.invoke('editor.saveTarget', target);
              } else {
                this.hide();
              }

              return isImage;
            }
            /**
             * hide
             *
             * @param {jQuery} $handle
             */

          }, {
            key: "hide",
            value: function hide() {
              this.context.invoke('editor.clearTarget');
              this.$handle.children().hide();
            }
          }]);
          return Handle;
        }(); // CONCATENATED MODULE: ./src/js/base/module/AutoLink.js


        function AutoLink_classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function AutoLink_defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function AutoLink_createClass(Constructor, protoProps, staticProps) {
          if (protoProps) AutoLink_defineProperties(Constructor.prototype, protoProps);
          if (staticProps) AutoLink_defineProperties(Constructor, staticProps);
          return Constructor;
        }

        var defaultScheme = 'http://';
        var linkPattern = /^([A-Za-z][A-Za-z0-9+-.]*\:[\/]{2}|tel:|mailto:[A-Z0-9._%+-]+@)?(www\.)?(.+)$/i;

        var AutoLink_AutoLink = /*#__PURE__*/function () {
          function AutoLink(context) {
            var _this = this;

            AutoLink_classCallCheck(this, AutoLink);
            this.context = context;
            this.options = context.options;
            this.events = {
              'summernote.keyup': function summernoteKeyup(we, e) {
                if (!e.isDefaultPrevented()) {
                  _this.handleKeyup(e);
                }
              },
              'summernote.keydown': function summernoteKeydown(we, e) {
                _this.handleKeydown(e);
              }
            };
          }

          AutoLink_createClass(AutoLink, [{
            key: "initialize",
            value: function initialize() {
              this.lastWordRange = null;
            }
          }, {
            key: "destroy",
            value: function destroy() {
              this.lastWordRange = null;
            }
          }, {
            key: "replace",
            value: function replace() {
              if (!this.lastWordRange) {
                return;
              }

              var keyword = this.lastWordRange.toString();
              var match = keyword.match(linkPattern);

              if (match && (match[1] || match[2])) {
                var link = match[1] ? keyword : defaultScheme + keyword;
                var urlText = this.options.showDomainOnlyForAutolink ? keyword.replace(/^(?:https?:\/\/)?(?:tel?:?)?(?:mailto?:?)?(?:www\.)?/i, '').split('/')[0] : keyword;
                var node = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()('<a />').html(urlText).attr('href', link)[0];

                if (this.context.options.linkTargetBlank) {
                  external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(node).attr('target', '_blank');
                }

                this.lastWordRange.insertNode(node);
                this.lastWordRange = null;
                this.context.invoke('editor.focus');
              }
            }
          }, {
            key: "handleKeydown",
            value: function handleKeydown(e) {
              if (lists.contains([core_key.code.ENTER, core_key.code.SPACE], e.keyCode)) {
                var wordRange = this.context.invoke('editor.createRange').getWordRange();
                this.lastWordRange = wordRange;
              }
            }
          }, {
            key: "handleKeyup",
            value: function handleKeyup(e) {
              if (lists.contains([core_key.code.ENTER, core_key.code.SPACE], e.keyCode)) {
                this.replace();
              }
            }
          }]);
          return AutoLink;
        }(); // CONCATENATED MODULE: ./src/js/base/module/AutoSync.js


        function AutoSync_classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function AutoSync_defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function AutoSync_createClass(Constructor, protoProps, staticProps) {
          if (protoProps) AutoSync_defineProperties(Constructor.prototype, protoProps);
          if (staticProps) AutoSync_defineProperties(Constructor, staticProps);
          return Constructor;
        }
        /**
         * textarea auto sync.
         */


        var AutoSync_AutoSync = /*#__PURE__*/function () {
          function AutoSync(context) {
            var _this = this;

            AutoSync_classCallCheck(this, AutoSync);
            this.$note = context.layoutInfo.note;
            this.events = {
              'summernote.change': function summernoteChange() {
                _this.$note.val(context.invoke('code'));
              }
            };
          }

          AutoSync_createClass(AutoSync, [{
            key: "shouldInitialize",
            value: function shouldInitialize() {
              return dom.isTextarea(this.$note[0]);
            }
          }]);
          return AutoSync;
        }(); // CONCATENATED MODULE: ./src/js/base/module/AutoReplace.js


        function AutoReplace_classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function AutoReplace_defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function AutoReplace_createClass(Constructor, protoProps, staticProps) {
          if (protoProps) AutoReplace_defineProperties(Constructor.prototype, protoProps);
          if (staticProps) AutoReplace_defineProperties(Constructor, staticProps);
          return Constructor;
        }

        var AutoReplace_AutoReplace = /*#__PURE__*/function () {
          function AutoReplace(context) {
            var _this = this;

            AutoReplace_classCallCheck(this, AutoReplace);
            this.context = context;
            this.options = context.options.replace || {};
            this.keys = [core_key.code.ENTER, core_key.code.SPACE, core_key.code.PERIOD, core_key.code.COMMA, core_key.code.SEMICOLON, core_key.code.SLASH];
            this.previousKeydownCode = null;
            this.events = {
              'summernote.keyup': function summernoteKeyup(we, e) {
                if (!e.isDefaultPrevented()) {
                  _this.handleKeyup(e);
                }
              },
              'summernote.keydown': function summernoteKeydown(we, e) {
                _this.handleKeydown(e);
              }
            };
          }

          AutoReplace_createClass(AutoReplace, [{
            key: "shouldInitialize",
            value: function shouldInitialize() {
              return !!this.options.match;
            }
          }, {
            key: "initialize",
            value: function initialize() {
              this.lastWord = null;
            }
          }, {
            key: "destroy",
            value: function destroy() {
              this.lastWord = null;
            }
          }, {
            key: "replace",
            value: function replace() {
              if (!this.lastWord) {
                return;
              }

              var self = this;
              var keyword = this.lastWord.toString();
              this.options.match(keyword, function (match) {
                if (match) {
                  var node = '';

                  if (typeof match === 'string') {
                    node = dom.createText(match);
                  } else if (match instanceof jQuery) {
                    node = match[0];
                  } else if (match instanceof Node) {
                    node = match;
                  }

                  if (!node) return;
                  self.lastWord.insertNode(node);
                  self.lastWord = null;
                  self.context.invoke('editor.focus');
                }
              });
            }
          }, {
            key: "handleKeydown",
            value: function handleKeydown(e) {
              // this forces it to remember the last whole word, even if multiple termination keys are pressed
              // before the previous key is let go.
              if (this.previousKeydownCode && lists.contains(this.keys, this.previousKeydownCode)) {
                this.previousKeydownCode = e.keyCode;
                return;
              }

              if (lists.contains(this.keys, e.keyCode)) {
                var wordRange = this.context.invoke('editor.createRange').getWordRange();
                this.lastWord = wordRange;
              }

              this.previousKeydownCode = e.keyCode;
            }
          }, {
            key: "handleKeyup",
            value: function handleKeyup(e) {
              if (lists.contains(this.keys, e.keyCode)) {
                this.replace();
              }
            }
          }]);
          return AutoReplace;
        }(); // CONCATENATED MODULE: ./src/js/base/module/Placeholder.js


        function Placeholder_classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function Placeholder_defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function Placeholder_createClass(Constructor, protoProps, staticProps) {
          if (protoProps) Placeholder_defineProperties(Constructor.prototype, protoProps);
          if (staticProps) Placeholder_defineProperties(Constructor, staticProps);
          return Constructor;
        }

        var Placeholder_Placeholder = /*#__PURE__*/function () {
          function Placeholder(context) {
            var _this = this;

            Placeholder_classCallCheck(this, Placeholder);
            this.context = context;
            this.$editingArea = context.layoutInfo.editingArea;
            this.options = context.options;

            if (this.options.inheritPlaceholder === true) {
              // get placeholder value from the original element
              this.options.placeholder = this.context.$note.attr('placeholder') || this.options.placeholder;
            }

            this.events = {
              'summernote.init summernote.change': function summernoteInitSummernoteChange() {
                _this.update();
              },
              'summernote.codeview.toggled': function summernoteCodeviewToggled() {
                _this.update();
              }
            };
          }

          Placeholder_createClass(Placeholder, [{
            key: "shouldInitialize",
            value: function shouldInitialize() {
              return !!this.options.placeholder;
            }
          }, {
            key: "initialize",
            value: function initialize() {
              var _this2 = this;

              this.$placeholder = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()('<div class="note-placeholder">');
              this.$placeholder.on('click', function () {
                _this2.context.invoke('focus');
              }).html(this.options.placeholder).prependTo(this.$editingArea);
              this.update();
            }
          }, {
            key: "destroy",
            value: function destroy() {
              this.$placeholder.remove();
            }
          }, {
            key: "update",
            value: function update() {
              var isShow = !this.context.invoke('codeview.isActivated') && this.context.invoke('editor.isEmpty');
              this.$placeholder.toggle(isShow);
            }
          }]);
          return Placeholder;
        }(); // CONCATENATED MODULE: ./src/js/base/module/Buttons.js


        function Buttons_classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function Buttons_defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function Buttons_createClass(Constructor, protoProps, staticProps) {
          if (protoProps) Buttons_defineProperties(Constructor.prototype, protoProps);
          if (staticProps) Buttons_defineProperties(Constructor, staticProps);
          return Constructor;
        }

        var Buttons_Buttons = /*#__PURE__*/function () {
          function Buttons(context) {
            Buttons_classCallCheck(this, Buttons);
            this.ui = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.summernote.ui;
            this.context = context;
            this.$toolbar = context.layoutInfo.toolbar;
            this.options = context.options;
            this.lang = this.options.langInfo;
            this.invertedKeyMap = func.invertObject(this.options.keyMap[env.isMac ? 'mac' : 'pc']);
          }

          Buttons_createClass(Buttons, [{
            key: "representShortcut",
            value: function representShortcut(editorMethod) {
              var shortcut = this.invertedKeyMap[editorMethod];

              if (!this.options.shortcuts || !shortcut) {
                return '';
              }

              if (env.isMac) {
                shortcut = shortcut.replace('CMD', '⌘').replace('SHIFT', '⇧');
              }

              shortcut = shortcut.replace('BACKSLASH', '\\').replace('SLASH', '/').replace('LEFTBRACKET', '[').replace('RIGHTBRACKET', ']');
              return ' (' + shortcut + ')';
            }
          }, {
            key: "button",
            value: function button(o) {
              if (!this.options.tooltip && o.tooltip) {
                delete o.tooltip;
              }

              o.container = this.options.container;
              return this.ui.button(o);
            }
          }, {
            key: "initialize",
            value: function initialize() {
              this.addToolbarButtons();
              this.addImagePopoverButtons();
              this.addLinkPopoverButtons();
              this.addTablePopoverButtons();
              this.fontInstalledMap = {};
            }
          }, {
            key: "destroy",
            value: function destroy() {
              delete this.fontInstalledMap;
            }
          }, {
            key: "isFontInstalled",
            value: function isFontInstalled(name) {
              if (!Object.prototype.hasOwnProperty.call(this.fontInstalledMap, name)) {
                this.fontInstalledMap[name] = env.isFontInstalled(name) || lists.contains(this.options.fontNamesIgnoreCheck, name);
              }

              return this.fontInstalledMap[name];
            }
          }, {
            key: "isFontDeservedToAdd",
            value: function isFontDeservedToAdd(name) {
              name = name.toLowerCase();
              return name !== '' && this.isFontInstalled(name) && env.genericFontFamilies.indexOf(name) === -1;
            }
          }, {
            key: "colorPalette",
            value: function colorPalette(className, tooltip, backColor, foreColor) {
              var _this = this;

              return this.ui.buttonGroup({
                className: 'note-color ' + className,
                children: [this.button({
                  className: 'note-current-color-button',
                  contents: this.ui.icon(this.options.icons.font + ' note-recent-color'),
                  tooltip: tooltip,
                  click: function click(e) {
                    var $button = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(e.currentTarget);

                    if (backColor && foreColor) {
                      _this.context.invoke('editor.color', {
                        backColor: $button.attr('data-backColor'),
                        foreColor: $button.attr('data-foreColor')
                      });
                    } else if (backColor) {
                      _this.context.invoke('editor.color', {
                        backColor: $button.attr('data-backColor')
                      });
                    } else if (foreColor) {
                      _this.context.invoke('editor.color', {
                        foreColor: $button.attr('data-foreColor')
                      });
                    }
                  },
                  callback: function callback($button) {
                    var $recentColor = $button.find('.note-recent-color');

                    if (backColor) {
                      $recentColor.css('background-color', _this.options.colorButton.backColor);
                      $button.attr('data-backColor', _this.options.colorButton.backColor);
                    }

                    if (foreColor) {
                      $recentColor.css('color', _this.options.colorButton.foreColor);
                      $button.attr('data-foreColor', _this.options.colorButton.foreColor);
                    } else {
                      $recentColor.css('color', 'transparent');
                    }
                  }
                }), this.button({
                  className: 'dropdown-toggle',
                  contents: this.ui.dropdownButtonContents('', this.options),
                  tooltip: this.lang.color.more,
                  data: {
                    toggle: 'dropdown'
                  }
                }), this.ui.dropdown({
                  items: (backColor ? ['<div class="note-palette">', '<div class="note-palette-title">' + this.lang.color.background + '</div>', '<div>', '<button type="button" class="note-color-reset btn btn-light btn-default" data-event="backColor" data-value="transparent">', this.lang.color.transparent, '</button>', '</div>', '<div class="note-holder" data-event="backColor"><!-- back colors --></div>', '<div>', '<button type="button" class="note-color-select btn btn-light btn-default" data-event="openPalette" data-value="backColorPicker">', this.lang.color.cpSelect, '</button>', '<input type="color" id="backColorPicker" class="note-btn note-color-select-btn" value="' + this.options.colorButton.backColor + '" data-event="backColorPalette">', '</div>', '<div class="note-holder-custom" id="backColorPalette" data-event="backColor"></div>', '</div>'].join('') : '') + (foreColor ? ['<div class="note-palette">', '<div class="note-palette-title">' + this.lang.color.foreground + '</div>', '<div>', '<button type="button" class="note-color-reset btn btn-light btn-default" data-event="removeFormat" data-value="foreColor">', this.lang.color.resetToDefault, '</button>', '</div>', '<div class="note-holder" data-event="foreColor"><!-- fore colors --></div>', '<div>', '<button type="button" class="note-color-select btn btn-light btn-default" data-event="openPalette" data-value="foreColorPicker">', this.lang.color.cpSelect, '</button>', '<input type="color" id="foreColorPicker" class="note-btn note-color-select-btn" value="' + this.options.colorButton.foreColor + '" data-event="foreColorPalette">', '</div>', // Fix missing Div, Commented to find easily if it's wrong
                  '<div class="note-holder-custom" id="foreColorPalette" data-event="foreColor"></div>', '</div>'].join('') : ''),
                  callback: function callback($dropdown) {
                    $dropdown.find('.note-holder').each(function (idx, item) {
                      var $holder = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(item);
                      $holder.append(_this.ui.palette({
                        colors: _this.options.colors,
                        colorsName: _this.options.colorsName,
                        eventName: $holder.data('event'),
                        container: _this.options.container,
                        tooltip: _this.options.tooltip
                      }).render());
                    });
                    /* TODO: do we have to record recent custom colors within cookies? */

                    var customColors = [['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']];
                    $dropdown.find('.note-holder-custom').each(function (idx, item) {
                      var $holder = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(item);
                      $holder.append(_this.ui.palette({
                        colors: customColors,
                        colorsName: customColors,
                        eventName: $holder.data('event'),
                        container: _this.options.container,
                        tooltip: _this.options.tooltip
                      }).render());
                    });
                    $dropdown.find('input[type=color]').each(function (idx, item) {
                      external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(item).change(function () {
                        var $chip = $dropdown.find('#' + external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(this).data('event')).find('.note-color-btn').first();
                        var color = this.value.toUpperCase();
                        $chip.css('background-color', color).attr('aria-label', color).attr('data-value', color).attr('data-original-title', color);
                        $chip.click();
                      });
                    });
                  },
                  click: function click(event) {
                    event.stopPropagation();
                    var $parent = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()('.' + className).find('.note-dropdown-menu');
                    var $button = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(event.target);
                    var eventName = $button.data('event');
                    var value = $button.attr('data-value');

                    if (eventName === 'openPalette') {
                      var $picker = $parent.find('#' + value);
                      var $palette = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()($parent.find('#' + $picker.data('event')).find('.note-color-row')[0]); // Shift palette chips

                      var $chip = $palette.find('.note-color-btn').last().detach(); // Set chip attributes

                      var color = $picker.val();
                      $chip.css('background-color', color).attr('aria-label', color).attr('data-value', color).attr('data-original-title', color);
                      $palette.prepend($chip);
                      $picker.click();
                    } else {
                      if (lists.contains(['backColor', 'foreColor'], eventName)) {
                        var key = eventName === 'backColor' ? 'background-color' : 'color';
                        var $color = $button.closest('.note-color').find('.note-recent-color');
                        var $currentButton = $button.closest('.note-color').find('.note-current-color-button');
                        $color.css(key, value);
                        $currentButton.attr('data-' + eventName, value);
                      }

                      _this.context.invoke('editor.' + eventName, value);
                    }
                  }
                })]
              }).render();
            }
          }, {
            key: "addToolbarButtons",
            value: function addToolbarButtons() {
              var _this2 = this;

              this.context.memo('button.style', function () {
                return _this2.ui.buttonGroup([_this2.button({
                  className: 'dropdown-toggle',
                  contents: _this2.ui.dropdownButtonContents(_this2.ui.icon(_this2.options.icons.magic), _this2.options),
                  tooltip: _this2.lang.style.style,
                  data: {
                    toggle: 'dropdown'
                  }
                }), _this2.ui.dropdown({
                  className: 'dropdown-style',
                  items: _this2.options.styleTags,
                  title: _this2.lang.style.style,
                  template: function template(item) {
                    // TBD: need to be simplified
                    if (typeof item === 'string') {
                      item = {
                        tag: item,
                        title: Object.prototype.hasOwnProperty.call(_this2.lang.style, item) ? _this2.lang.style[item] : item
                      };
                    }

                    var tag = item.tag;
                    var title = item.title;
                    var style = item.style ? ' style="' + item.style + '" ' : '';
                    var className = item.className ? ' class="' + item.className + '"' : '';
                    return '<' + tag + style + className + '>' + title + '</' + tag + '>';
                  },
                  click: _this2.context.createInvokeHandler('editor.formatBlock')
                })]).render();
              });

              var _loop = function _loop(styleIdx, styleLen) {
                var item = _this2.options.styleTags[styleIdx];

                _this2.context.memo('button.style.' + item, function () {
                  return _this2.button({
                    className: 'note-btn-style-' + item,
                    contents: '<div data-value="' + item + '">' + item.toUpperCase() + '</div>',
                    tooltip: _this2.lang.style[item],
                    click: _this2.context.createInvokeHandler('editor.formatBlock')
                  }).render();
                });
              };

              for (var styleIdx = 0, styleLen = this.options.styleTags.length; styleIdx < styleLen; styleIdx++) {
                _loop(styleIdx, styleLen);
              }

              this.context.memo('button.bold', function () {
                return _this2.button({
                  className: 'note-btn-bold',
                  contents: _this2.ui.icon(_this2.options.icons.bold),
                  tooltip: _this2.lang.font.bold + _this2.representShortcut('bold'),
                  click: _this2.context.createInvokeHandlerAndUpdateState('editor.bold')
                }).render();
              });
              this.context.memo('button.italic', function () {
                return _this2.button({
                  className: 'note-btn-italic',
                  contents: _this2.ui.icon(_this2.options.icons.italic),
                  tooltip: _this2.lang.font.italic + _this2.representShortcut('italic'),
                  click: _this2.context.createInvokeHandlerAndUpdateState('editor.italic')
                }).render();
              });
              this.context.memo('button.underline', function () {
                return _this2.button({
                  className: 'note-btn-underline',
                  contents: _this2.ui.icon(_this2.options.icons.underline),
                  tooltip: _this2.lang.font.underline + _this2.representShortcut('underline'),
                  click: _this2.context.createInvokeHandlerAndUpdateState('editor.underline')
                }).render();
              });
              this.context.memo('button.clear', function () {
                return _this2.button({
                  contents: _this2.ui.icon(_this2.options.icons.eraser),
                  tooltip: _this2.lang.font.clear + _this2.representShortcut('removeFormat'),
                  click: _this2.context.createInvokeHandler('editor.removeFormat')
                }).render();
              });
              this.context.memo('button.strikethrough', function () {
                return _this2.button({
                  className: 'note-btn-strikethrough',
                  contents: _this2.ui.icon(_this2.options.icons.strikethrough),
                  tooltip: _this2.lang.font.strikethrough + _this2.representShortcut('strikethrough'),
                  click: _this2.context.createInvokeHandlerAndUpdateState('editor.strikethrough')
                }).render();
              });
              this.context.memo('button.superscript', function () {
                return _this2.button({
                  className: 'note-btn-superscript',
                  contents: _this2.ui.icon(_this2.options.icons.superscript),
                  tooltip: _this2.lang.font.superscript,
                  click: _this2.context.createInvokeHandlerAndUpdateState('editor.superscript')
                }).render();
              });
              this.context.memo('button.subscript', function () {
                return _this2.button({
                  className: 'note-btn-subscript',
                  contents: _this2.ui.icon(_this2.options.icons.subscript),
                  tooltip: _this2.lang.font.subscript,
                  click: _this2.context.createInvokeHandlerAndUpdateState('editor.subscript')
                }).render();
              });
              this.context.memo('button.fontname', function () {
                var styleInfo = _this2.context.invoke('editor.currentStyle');

                if (_this2.options.addDefaultFonts) {
                  // Add 'default' fonts into the fontnames array if not exist
                  external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.each(styleInfo['font-family'].split(','), function (idx, fontname) {
                    fontname = fontname.trim().replace(/['"]+/g, '');

                    if (_this2.isFontDeservedToAdd(fontname)) {
                      if (_this2.options.fontNames.indexOf(fontname) === -1) {
                        _this2.options.fontNames.push(fontname);
                      }
                    }
                  });
                }

                return _this2.ui.buttonGroup([_this2.button({
                  className: 'dropdown-toggle',
                  contents: _this2.ui.dropdownButtonContents('<span class="note-current-fontname"></span>', _this2.options),
                  tooltip: _this2.lang.font.name,
                  data: {
                    toggle: 'dropdown'
                  }
                }), _this2.ui.dropdownCheck({
                  className: 'dropdown-fontname',
                  checkClassName: _this2.options.icons.menuCheck,
                  items: _this2.options.fontNames.filter(_this2.isFontInstalled.bind(_this2)),
                  title: _this2.lang.font.name,
                  template: function template(item) {
                    return '<span style="font-family: ' + env.validFontName(item) + '">' + item + '</span>';
                  },
                  click: _this2.context.createInvokeHandlerAndUpdateState('editor.fontName')
                })]).render();
              });
              this.context.memo('button.fontsize', function () {
                return _this2.ui.buttonGroup([_this2.button({
                  className: 'dropdown-toggle',
                  contents: _this2.ui.dropdownButtonContents('<span class="note-current-fontsize"></span>', _this2.options),
                  tooltip: _this2.lang.font.size,
                  data: {
                    toggle: 'dropdown'
                  }
                }), _this2.ui.dropdownCheck({
                  className: 'dropdown-fontsize',
                  checkClassName: _this2.options.icons.menuCheck,
                  items: _this2.options.fontSizes,
                  title: _this2.lang.font.size,
                  click: _this2.context.createInvokeHandlerAndUpdateState('editor.fontSize')
                })]).render();
              });
              this.context.memo('button.fontsizeunit', function () {
                return _this2.ui.buttonGroup([_this2.button({
                  className: 'dropdown-toggle',
                  contents: _this2.ui.dropdownButtonContents('<span class="note-current-fontsizeunit"></span>', _this2.options),
                  tooltip: _this2.lang.font.sizeunit,
                  data: {
                    toggle: 'dropdown'
                  }
                }), _this2.ui.dropdownCheck({
                  className: 'dropdown-fontsizeunit',
                  checkClassName: _this2.options.icons.menuCheck,
                  items: _this2.options.fontSizeUnits,
                  title: _this2.lang.font.sizeunit,
                  click: _this2.context.createInvokeHandlerAndUpdateState('editor.fontSizeUnit')
                })]).render();
              });
              this.context.memo('button.color', function () {
                return _this2.colorPalette('note-color-all', _this2.lang.color.recent, true, true);
              });
              this.context.memo('button.forecolor', function () {
                return _this2.colorPalette('note-color-fore', _this2.lang.color.foreground, false, true);
              });
              this.context.memo('button.backcolor', function () {
                return _this2.colorPalette('note-color-back', _this2.lang.color.background, true, false);
              });
              this.context.memo('button.ul', function () {
                return _this2.button({
                  contents: _this2.ui.icon(_this2.options.icons.unorderedlist),
                  tooltip: _this2.lang.lists.unordered + _this2.representShortcut('insertUnorderedList'),
                  click: _this2.context.createInvokeHandler('editor.insertUnorderedList')
                }).render();
              });
              this.context.memo('button.ol', function () {
                return _this2.button({
                  contents: _this2.ui.icon(_this2.options.icons.orderedlist),
                  tooltip: _this2.lang.lists.ordered + _this2.representShortcut('insertOrderedList'),
                  click: _this2.context.createInvokeHandler('editor.insertOrderedList')
                }).render();
              });
              var justifyLeft = this.button({
                contents: this.ui.icon(this.options.icons.alignLeft),
                tooltip: this.lang.paragraph.left + this.representShortcut('justifyLeft'),
                click: this.context.createInvokeHandler('editor.justifyLeft')
              });
              var justifyCenter = this.button({
                contents: this.ui.icon(this.options.icons.alignCenter),
                tooltip: this.lang.paragraph.center + this.representShortcut('justifyCenter'),
                click: this.context.createInvokeHandler('editor.justifyCenter')
              });
              var justifyRight = this.button({
                contents: this.ui.icon(this.options.icons.alignRight),
                tooltip: this.lang.paragraph.right + this.representShortcut('justifyRight'),
                click: this.context.createInvokeHandler('editor.justifyRight')
              });
              var justifyFull = this.button({
                contents: this.ui.icon(this.options.icons.alignJustify),
                tooltip: this.lang.paragraph.justify + this.representShortcut('justifyFull'),
                click: this.context.createInvokeHandler('editor.justifyFull')
              });
              var outdent = this.button({
                contents: this.ui.icon(this.options.icons.outdent),
                tooltip: this.lang.paragraph.outdent + this.representShortcut('outdent'),
                click: this.context.createInvokeHandler('editor.outdent')
              });
              var indent = this.button({
                contents: this.ui.icon(this.options.icons.indent),
                tooltip: this.lang.paragraph.indent + this.representShortcut('indent'),
                click: this.context.createInvokeHandler('editor.indent')
              });
              this.context.memo('button.justifyLeft', func.invoke(justifyLeft, 'render'));
              this.context.memo('button.justifyCenter', func.invoke(justifyCenter, 'render'));
              this.context.memo('button.justifyRight', func.invoke(justifyRight, 'render'));
              this.context.memo('button.justifyFull', func.invoke(justifyFull, 'render'));
              this.context.memo('button.outdent', func.invoke(outdent, 'render'));
              this.context.memo('button.indent', func.invoke(indent, 'render'));
              this.context.memo('button.paragraph', function () {
                return _this2.ui.buttonGroup([_this2.button({
                  className: 'dropdown-toggle',
                  contents: _this2.ui.dropdownButtonContents(_this2.ui.icon(_this2.options.icons.alignLeft), _this2.options),
                  tooltip: _this2.lang.paragraph.paragraph,
                  data: {
                    toggle: 'dropdown'
                  }
                }), _this2.ui.dropdown([_this2.ui.buttonGroup({
                  className: 'note-align',
                  children: [justifyLeft, justifyCenter, justifyRight, justifyFull]
                }), _this2.ui.buttonGroup({
                  className: 'note-list',
                  children: [outdent, indent]
                })])]).render();
              });
              this.context.memo('button.height', function () {
                return _this2.ui.buttonGroup([_this2.button({
                  className: 'dropdown-toggle',
                  contents: _this2.ui.dropdownButtonContents(_this2.ui.icon(_this2.options.icons.textHeight), _this2.options),
                  tooltip: _this2.lang.font.height,
                  data: {
                    toggle: 'dropdown'
                  }
                }), _this2.ui.dropdownCheck({
                  items: _this2.options.lineHeights,
                  checkClassName: _this2.options.icons.menuCheck,
                  className: 'dropdown-line-height',
                  title: _this2.lang.font.height,
                  click: _this2.context.createInvokeHandler('editor.lineHeight')
                })]).render();
              });
              this.context.memo('button.table', function () {
                return _this2.ui.buttonGroup([_this2.button({
                  className: 'dropdown-toggle',
                  contents: _this2.ui.dropdownButtonContents(_this2.ui.icon(_this2.options.icons.table), _this2.options),
                  tooltip: _this2.lang.table.table,
                  data: {
                    toggle: 'dropdown'
                  }
                }), _this2.ui.dropdown({
                  title: _this2.lang.table.table,
                  className: 'note-table',
                  items: ['<div class="note-dimension-picker">', '<div class="note-dimension-picker-mousecatcher" data-event="insertTable" data-value="1x1"></div>', '<div class="note-dimension-picker-highlighted"></div>', '<div class="note-dimension-picker-unhighlighted"></div>', '</div>', '<div class="note-dimension-display">1 x 1</div>'].join('')
                })], {
                  callback: function callback($node) {
                    var $catcher = $node.find('.note-dimension-picker-mousecatcher');
                    $catcher.css({
                      width: _this2.options.insertTableMaxSize.col + 'em',
                      height: _this2.options.insertTableMaxSize.row + 'em'
                    }).mousedown(_this2.context.createInvokeHandler('editor.insertTable')).on('mousemove', _this2.tableMoveHandler.bind(_this2));
                  }
                }).render();
              });
              this.context.memo('button.link', function () {
                return _this2.button({
                  contents: _this2.ui.icon(_this2.options.icons.link),
                  tooltip: _this2.lang.link.link + _this2.representShortcut('linkDialog.show'),
                  click: _this2.context.createInvokeHandler('linkDialog.show')
                }).render();
              });
              this.context.memo('button.picture', function () {
                return _this2.button({
                  contents: _this2.ui.icon(_this2.options.icons.picture),
                  tooltip: _this2.lang.image.image,
                  click: _this2.context.createInvokeHandler('imageDialog.show')
                }).render();
              });
              this.context.memo('button.video', function () {
                return _this2.button({
                  contents: _this2.ui.icon(_this2.options.icons.video),
                  tooltip: _this2.lang.video.video,
                  click: _this2.context.createInvokeHandler('videoDialog.show')
                }).render();
              });
              this.context.memo('button.hr', function () {
                return _this2.button({
                  contents: _this2.ui.icon(_this2.options.icons.minus),
                  tooltip: _this2.lang.hr.insert + _this2.representShortcut('insertHorizontalRule'),
                  click: _this2.context.createInvokeHandler('editor.insertHorizontalRule')
                }).render();
              });
              this.context.memo('button.fullscreen', function () {
                return _this2.button({
                  className: 'btn-fullscreen note-codeview-keep',
                  contents: _this2.ui.icon(_this2.options.icons.arrowsAlt),
                  tooltip: _this2.lang.options.fullscreen,
                  click: _this2.context.createInvokeHandler('fullscreen.toggle')
                }).render();
              });
              this.context.memo('button.codeview', function () {
                return _this2.button({
                  className: 'btn-codeview note-codeview-keep',
                  contents: _this2.ui.icon(_this2.options.icons.code),
                  tooltip: _this2.lang.options.codeview,
                  click: _this2.context.createInvokeHandler('codeview.toggle')
                }).render();
              });
              this.context.memo('button.redo', function () {
                return _this2.button({
                  contents: _this2.ui.icon(_this2.options.icons.redo),
                  tooltip: _this2.lang.history.redo + _this2.representShortcut('redo'),
                  click: _this2.context.createInvokeHandler('editor.redo')
                }).render();
              });
              this.context.memo('button.undo', function () {
                return _this2.button({
                  contents: _this2.ui.icon(_this2.options.icons.undo),
                  tooltip: _this2.lang.history.undo + _this2.representShortcut('undo'),
                  click: _this2.context.createInvokeHandler('editor.undo')
                }).render();
              });
              this.context.memo('button.help', function () {
                return _this2.button({
                  contents: _this2.ui.icon(_this2.options.icons.question),
                  tooltip: _this2.lang.options.help,
                  click: _this2.context.createInvokeHandler('helpDialog.show')
                }).render();
              });
            }
            /**
             * image: [
             *   ['imageResize', ['resizeFull', 'resizeHalf', 'resizeQuarter', 'resizeNone']],
             *   ['float', ['floatLeft', 'floatRight', 'floatNone']],
             *   ['remove', ['removeMedia']],
             * ],
             */

          }, {
            key: "addImagePopoverButtons",
            value: function addImagePopoverButtons() {
              var _this3 = this; // Image Size Buttons


              this.context.memo('button.resizeFull', function () {
                return _this3.button({
                  contents: '<span class="note-fontsize-10">100%</span>',
                  tooltip: _this3.lang.image.resizeFull,
                  click: _this3.context.createInvokeHandler('editor.resize', '1')
                }).render();
              });
              this.context.memo('button.resizeHalf', function () {
                return _this3.button({
                  contents: '<span class="note-fontsize-10">50%</span>',
                  tooltip: _this3.lang.image.resizeHalf,
                  click: _this3.context.createInvokeHandler('editor.resize', '0.5')
                }).render();
              });
              this.context.memo('button.resizeQuarter', function () {
                return _this3.button({
                  contents: '<span class="note-fontsize-10">25%</span>',
                  tooltip: _this3.lang.image.resizeQuarter,
                  click: _this3.context.createInvokeHandler('editor.resize', '0.25')
                }).render();
              });
              this.context.memo('button.resizeNone', function () {
                return _this3.button({
                  contents: _this3.ui.icon(_this3.options.icons.rollback),
                  tooltip: _this3.lang.image.resizeNone,
                  click: _this3.context.createInvokeHandler('editor.resize', '0')
                }).render();
              }); // Float Buttons

              this.context.memo('button.floatLeft', function () {
                return _this3.button({
                  contents: _this3.ui.icon(_this3.options.icons.floatLeft),
                  tooltip: _this3.lang.image.floatLeft,
                  click: _this3.context.createInvokeHandler('editor.floatMe', 'left')
                }).render();
              });
              this.context.memo('button.floatRight', function () {
                return _this3.button({
                  contents: _this3.ui.icon(_this3.options.icons.floatRight),
                  tooltip: _this3.lang.image.floatRight,
                  click: _this3.context.createInvokeHandler('editor.floatMe', 'right')
                }).render();
              });
              this.context.memo('button.floatNone', function () {
                return _this3.button({
                  contents: _this3.ui.icon(_this3.options.icons.rollback),
                  tooltip: _this3.lang.image.floatNone,
                  click: _this3.context.createInvokeHandler('editor.floatMe', 'none')
                }).render();
              }); // Remove Buttons

              this.context.memo('button.removeMedia', function () {
                return _this3.button({
                  contents: _this3.ui.icon(_this3.options.icons.trash),
                  tooltip: _this3.lang.image.remove,
                  click: _this3.context.createInvokeHandler('editor.removeMedia')
                }).render();
              });
            }
          }, {
            key: "addLinkPopoverButtons",
            value: function addLinkPopoverButtons() {
              var _this4 = this;

              this.context.memo('button.linkDialogShow', function () {
                return _this4.button({
                  contents: _this4.ui.icon(_this4.options.icons.link),
                  tooltip: _this4.lang.link.edit,
                  click: _this4.context.createInvokeHandler('linkDialog.show')
                }).render();
              });
              this.context.memo('button.unlink', function () {
                return _this4.button({
                  contents: _this4.ui.icon(_this4.options.icons.unlink),
                  tooltip: _this4.lang.link.unlink,
                  click: _this4.context.createInvokeHandler('editor.unlink')
                }).render();
              });
            }
            /**
             * table : [
             *  ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
             *  ['delete', ['deleteRow', 'deleteCol', 'deleteTable']]
             * ],
             */

          }, {
            key: "addTablePopoverButtons",
            value: function addTablePopoverButtons() {
              var _this5 = this;

              this.context.memo('button.addRowUp', function () {
                return _this5.button({
                  className: 'btn-md',
                  contents: _this5.ui.icon(_this5.options.icons.rowAbove),
                  tooltip: _this5.lang.table.addRowAbove,
                  click: _this5.context.createInvokeHandler('editor.addRow', 'top')
                }).render();
              });
              this.context.memo('button.addRowDown', function () {
                return _this5.button({
                  className: 'btn-md',
                  contents: _this5.ui.icon(_this5.options.icons.rowBelow),
                  tooltip: _this5.lang.table.addRowBelow,
                  click: _this5.context.createInvokeHandler('editor.addRow', 'bottom')
                }).render();
              });
              this.context.memo('button.addColLeft', function () {
                return _this5.button({
                  className: 'btn-md',
                  contents: _this5.ui.icon(_this5.options.icons.colBefore),
                  tooltip: _this5.lang.table.addColLeft,
                  click: _this5.context.createInvokeHandler('editor.addCol', 'left')
                }).render();
              });
              this.context.memo('button.addColRight', function () {
                return _this5.button({
                  className: 'btn-md',
                  contents: _this5.ui.icon(_this5.options.icons.colAfter),
                  tooltip: _this5.lang.table.addColRight,
                  click: _this5.context.createInvokeHandler('editor.addCol', 'right')
                }).render();
              });
              this.context.memo('button.deleteRow', function () {
                return _this5.button({
                  className: 'btn-md',
                  contents: _this5.ui.icon(_this5.options.icons.rowRemove),
                  tooltip: _this5.lang.table.delRow,
                  click: _this5.context.createInvokeHandler('editor.deleteRow')
                }).render();
              });
              this.context.memo('button.deleteCol', function () {
                return _this5.button({
                  className: 'btn-md',
                  contents: _this5.ui.icon(_this5.options.icons.colRemove),
                  tooltip: _this5.lang.table.delCol,
                  click: _this5.context.createInvokeHandler('editor.deleteCol')
                }).render();
              });
              this.context.memo('button.deleteTable', function () {
                return _this5.button({
                  className: 'btn-md',
                  contents: _this5.ui.icon(_this5.options.icons.trash),
                  tooltip: _this5.lang.table.delTable,
                  click: _this5.context.createInvokeHandler('editor.deleteTable')
                }).render();
              });
            }
          }, {
            key: "build",
            value: function build($container, groups) {
              for (var groupIdx = 0, groupLen = groups.length; groupIdx < groupLen; groupIdx++) {
                var group = groups[groupIdx];
                var groupName = Array.isArray(group) ? group[0] : group;
                var buttons = Array.isArray(group) ? group.length === 1 ? [group[0]] : group[1] : [group];
                var $group = this.ui.buttonGroup({
                  className: 'note-' + groupName
                }).render();

                for (var idx = 0, len = buttons.length; idx < len; idx++) {
                  var btn = this.context.memo('button.' + buttons[idx]);

                  if (btn) {
                    $group.append(typeof btn === 'function' ? btn(this.context) : btn);
                  }
                }

                $group.appendTo($container);
              }
            }
            /**
             * @param {jQuery} [$container]
             */

          }, {
            key: "updateCurrentStyle",
            value: function updateCurrentStyle($container) {
              var _this6 = this;

              var $cont = $container || this.$toolbar;
              var styleInfo = this.context.invoke('editor.currentStyle');
              this.updateBtnStates($cont, {
                '.note-btn-bold': function noteBtnBold() {
                  return styleInfo['font-bold'] === 'bold';
                },
                '.note-btn-italic': function noteBtnItalic() {
                  return styleInfo['font-italic'] === 'italic';
                },
                '.note-btn-underline': function noteBtnUnderline() {
                  return styleInfo['font-underline'] === 'underline';
                },
                '.note-btn-subscript': function noteBtnSubscript() {
                  return styleInfo['font-subscript'] === 'subscript';
                },
                '.note-btn-superscript': function noteBtnSuperscript() {
                  return styleInfo['font-superscript'] === 'superscript';
                },
                '.note-btn-strikethrough': function noteBtnStrikethrough() {
                  return styleInfo['font-strikethrough'] === 'strikethrough';
                }
              });

              if (styleInfo['font-family']) {
                var fontNames = styleInfo['font-family'].split(',').map(function (name) {
                  return name.replace(/[\'\"]/g, '').replace(/\s+$/, '').replace(/^\s+/, '');
                });
                var fontName = lists.find(fontNames, this.isFontInstalled.bind(this));
                $cont.find('.dropdown-fontname a').each(function (idx, item) {
                  var $item = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(item); // always compare string to avoid creating another func.

                  var isChecked = $item.data('value') + '' === fontName + '';
                  $item.toggleClass('checked', isChecked);
                });
                $cont.find('.note-current-fontname').text(fontName).css('font-family', fontName);
              }

              if (styleInfo['font-size']) {
                var fontSize = styleInfo['font-size'];
                $cont.find('.dropdown-fontsize a').each(function (idx, item) {
                  var $item = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(item); // always compare with string to avoid creating another func.

                  var isChecked = $item.data('value') + '' === fontSize + '';
                  $item.toggleClass('checked', isChecked);
                });
                $cont.find('.note-current-fontsize').text(fontSize);
                var fontSizeUnit = styleInfo['font-size-unit'];
                $cont.find('.dropdown-fontsizeunit a').each(function (idx, item) {
                  var $item = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(item);
                  var isChecked = $item.data('value') + '' === fontSizeUnit + '';
                  $item.toggleClass('checked', isChecked);
                });
                $cont.find('.note-current-fontsizeunit').text(fontSizeUnit);
              }

              if (styleInfo['line-height']) {
                var lineHeight = styleInfo['line-height'];
                $cont.find('.dropdown-line-height li a').each(function (idx, item) {
                  // always compare with string to avoid creating another func.
                  var isChecked = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(item).data('value') + '' === lineHeight + '';
                  _this6.className = isChecked ? 'checked' : '';
                });
              }
            }
          }, {
            key: "updateBtnStates",
            value: function updateBtnStates($container, infos) {
              var _this7 = this;

              external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.each(infos, function (selector, pred) {
                _this7.ui.toggleBtnActive($container.find(selector), pred());
              });
            }
          }, {
            key: "tableMoveHandler",
            value: function tableMoveHandler(event) {
              var PX_PER_EM = 18;
              var $picker = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(event.target.parentNode); // target is mousecatcher

              var $dimensionDisplay = $picker.next();
              var $catcher = $picker.find('.note-dimension-picker-mousecatcher');
              var $highlighted = $picker.find('.note-dimension-picker-highlighted');
              var $unhighlighted = $picker.find('.note-dimension-picker-unhighlighted');
              var posOffset; // HTML5 with jQuery - e.offsetX is undefined in Firefox

              if (event.offsetX === undefined) {
                var posCatcher = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(event.target).offset();
                posOffset = {
                  x: event.pageX - posCatcher.left,
                  y: event.pageY - posCatcher.top
                };
              } else {
                posOffset = {
                  x: event.offsetX,
                  y: event.offsetY
                };
              }

              var dim = {
                c: Math.ceil(posOffset.x / PX_PER_EM) || 1,
                r: Math.ceil(posOffset.y / PX_PER_EM) || 1
              };
              $highlighted.css({
                width: dim.c + 'em',
                height: dim.r + 'em'
              });
              $catcher.data('value', dim.c + 'x' + dim.r);

              if (dim.c > 3 && dim.c < this.options.insertTableMaxSize.col) {
                $unhighlighted.css({
                  width: dim.c + 1 + 'em'
                });
              }

              if (dim.r > 3 && dim.r < this.options.insertTableMaxSize.row) {
                $unhighlighted.css({
                  height: dim.r + 1 + 'em'
                });
              }

              $dimensionDisplay.html(dim.c + ' x ' + dim.r);
            }
          }]);
          return Buttons;
        }(); // CONCATENATED MODULE: ./src/js/base/module/Toolbar.js


        function Toolbar_classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function Toolbar_defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function Toolbar_createClass(Constructor, protoProps, staticProps) {
          if (protoProps) Toolbar_defineProperties(Constructor.prototype, protoProps);
          if (staticProps) Toolbar_defineProperties(Constructor, staticProps);
          return Constructor;
        }

        var Toolbar_Toolbar = /*#__PURE__*/function () {
          function Toolbar(context) {
            Toolbar_classCallCheck(this, Toolbar);
            this.context = context;
            this.$window = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(window);
            this.$document = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(document);
            this.ui = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.summernote.ui;
            this.$note = context.layoutInfo.note;
            this.$editor = context.layoutInfo.editor;
            this.$toolbar = context.layoutInfo.toolbar;
            this.$editable = context.layoutInfo.editable;
            this.$statusbar = context.layoutInfo.statusbar;
            this.options = context.options;
            this.isFollowing = false;
            this.followScroll = this.followScroll.bind(this);
          }

          Toolbar_createClass(Toolbar, [{
            key: "shouldInitialize",
            value: function shouldInitialize() {
              return !this.options.airMode;
            }
          }, {
            key: "initialize",
            value: function initialize() {
              var _this = this;

              this.options.toolbar = this.options.toolbar || [];

              if (!this.options.toolbar.length) {
                this.$toolbar.hide();
              } else {
                this.context.invoke('buttons.build', this.$toolbar, this.options.toolbar);
              }

              if (this.options.toolbarContainer) {
                this.$toolbar.appendTo(this.options.toolbarContainer);
              }

              this.changeContainer(false);
              this.$note.on('summernote.keyup summernote.mouseup summernote.change', function () {
                _this.context.invoke('buttons.updateCurrentStyle');
              });
              this.context.invoke('buttons.updateCurrentStyle');

              if (this.options.followingToolbar) {
                this.$window.on('scroll resize', this.followScroll);
              }
            }
          }, {
            key: "destroy",
            value: function destroy() {
              this.$toolbar.children().remove();

              if (this.options.followingToolbar) {
                this.$window.off('scroll resize', this.followScroll);
              }
            }
          }, {
            key: "followScroll",
            value: function followScroll() {
              if (this.$editor.hasClass('fullscreen')) {
                return false;
              }

              var editorHeight = this.$editor.outerHeight();
              var editorWidth = this.$editor.width();
              var toolbarHeight = this.$toolbar.height();
              var statusbarHeight = this.$statusbar.height(); // check if the web app is currently using another static bar

              var otherBarHeight = 0;

              if (this.options.otherStaticBar) {
                otherBarHeight = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(this.options.otherStaticBar).outerHeight();
              }

              var currentOffset = this.$document.scrollTop();
              var editorOffsetTop = this.$editor.offset().top;
              var editorOffsetBottom = editorOffsetTop + editorHeight;
              var activateOffset = editorOffsetTop - otherBarHeight;
              var deactivateOffsetBottom = editorOffsetBottom - otherBarHeight - toolbarHeight - statusbarHeight;

              if (!this.isFollowing && currentOffset > activateOffset && currentOffset < deactivateOffsetBottom - toolbarHeight) {
                this.isFollowing = true;
                this.$editable.css({
                  marginTop: this.$toolbar.outerHeight()
                });
                this.$toolbar.css({
                  position: 'fixed',
                  top: otherBarHeight,
                  width: editorWidth,
                  zIndex: 1000
                });
              } else if (this.isFollowing && (currentOffset < activateOffset || currentOffset > deactivateOffsetBottom)) {
                this.isFollowing = false;
                this.$toolbar.css({
                  position: 'relative',
                  top: 0,
                  width: '100%',
                  zIndex: 'auto'
                });
                this.$editable.css({
                  marginTop: ''
                });
              }
            }
          }, {
            key: "changeContainer",
            value: function changeContainer(isFullscreen) {
              if (isFullscreen) {
                this.$toolbar.prependTo(this.$editor);
              } else {
                if (this.options.toolbarContainer) {
                  this.$toolbar.appendTo(this.options.toolbarContainer);
                }
              }

              if (this.options.followingToolbar) {
                this.followScroll();
              }
            }
          }, {
            key: "updateFullscreen",
            value: function updateFullscreen(isFullscreen) {
              this.ui.toggleBtnActive(this.$toolbar.find('.btn-fullscreen'), isFullscreen);
              this.changeContainer(isFullscreen);
            }
          }, {
            key: "updateCodeview",
            value: function updateCodeview(isCodeview) {
              this.ui.toggleBtnActive(this.$toolbar.find('.btn-codeview'), isCodeview);

              if (isCodeview) {
                this.deactivate();
              } else {
                this.activate();
              }
            }
          }, {
            key: "activate",
            value: function activate(isIncludeCodeview) {
              var $btn = this.$toolbar.find('button');

              if (!isIncludeCodeview) {
                $btn = $btn.not('.note-codeview-keep');
              }

              this.ui.toggleBtn($btn, true);
            }
          }, {
            key: "deactivate",
            value: function deactivate(isIncludeCodeview) {
              var $btn = this.$toolbar.find('button');

              if (!isIncludeCodeview) {
                $btn = $btn.not('.note-codeview-keep');
              }

              this.ui.toggleBtn($btn, false);
            }
          }]);
          return Toolbar;
        }(); // CONCATENATED MODULE: ./src/js/base/module/LinkDialog.js


        function LinkDialog_classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function LinkDialog_defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function LinkDialog_createClass(Constructor, protoProps, staticProps) {
          if (protoProps) LinkDialog_defineProperties(Constructor.prototype, protoProps);
          if (staticProps) LinkDialog_defineProperties(Constructor, staticProps);
          return Constructor;
        }

        var LinkDialog_LinkDialog = /*#__PURE__*/function () {
          function LinkDialog(context) {
            LinkDialog_classCallCheck(this, LinkDialog);
            this.context = context;
            this.ui = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.summernote.ui;
            this.$body = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(document.body);
            this.$editor = context.layoutInfo.editor;
            this.options = context.options;
            this.lang = this.options.langInfo;
            context.memo('help.linkDialog.show', this.options.langInfo.help['linkDialog.show']);
          }

          LinkDialog_createClass(LinkDialog, [{
            key: "initialize",
            value: function initialize() {
              var $container = this.options.dialogsInBody ? this.$body : this.options.container;
              var body = ['<div class="form-group note-form-group">', "<label for=\"note-dialog-link-txt-".concat(this.options.id, "\" class=\"note-form-label\">").concat(this.lang.link.textToDisplay, "</label>"), "<input id=\"note-dialog-link-txt-".concat(this.options.id, "\" class=\"note-link-text form-control note-form-control note-input\" type=\"text\"/>"), '</div>', '<div class="form-group note-form-group">', "<label for=\"note-dialog-link-url-".concat(this.options.id, "\" class=\"note-form-label\">").concat(this.lang.link.url, "</label>"), "<input id=\"note-dialog-link-url-".concat(this.options.id, "\" class=\"note-link-url form-control note-form-control note-input\" type=\"text\" value=\"http://\"/>"), '</div>', !this.options.disableLinkTarget ? external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()('<div/>').append(this.ui.checkbox({
                className: 'sn-checkbox-open-in-new-window',
                text: this.lang.link.openInNewWindow,
                checked: true
              }).render()).html() : '', external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()('<div/>').append(this.ui.checkbox({
                className: 'sn-checkbox-use-protocol',
                text: this.lang.link.useProtocol,
                checked: true
              }).render()).html()].join('');
              var buttonClass = 'btn btn-primary note-btn note-btn-primary note-link-btn';
              var footer = "<input type=\"button\" href=\"#\" class=\"".concat(buttonClass, "\" value=\"").concat(this.lang.link.insert, "\" disabled>");
              this.$dialog = this.ui.dialog({
                className: 'link-dialog',
                title: this.lang.link.insert,
                fade: this.options.dialogsFade,
                body: body,
                footer: footer
              }).render().appendTo($container);
            }
          }, {
            key: "destroy",
            value: function destroy() {
              this.ui.hideDialog(this.$dialog);
              this.$dialog.remove();
            }
          }, {
            key: "bindEnterKey",
            value: function bindEnterKey($input, $btn) {
              $input.on('keypress', function (event) {
                if (event.keyCode === core_key.code.ENTER) {
                  event.preventDefault();
                  $btn.trigger('click');
                }
              });
            }
            /**
             * toggle update button
             */

          }, {
            key: "toggleLinkBtn",
            value: function toggleLinkBtn($linkBtn, $linkText, $linkUrl) {
              this.ui.toggleBtn($linkBtn, $linkText.val() && $linkUrl.val());
            }
            /**
             * Show link dialog and set event handlers on dialog controls.
             *
             * @param {Object} linkInfo
             * @return {Promise}
             */

          }, {
            key: "showLinkDialog",
            value: function showLinkDialog(linkInfo) {
              var _this = this;

              return external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.Deferred(function (deferred) {
                var $linkText = _this.$dialog.find('.note-link-text');

                var $linkUrl = _this.$dialog.find('.note-link-url');

                var $linkBtn = _this.$dialog.find('.note-link-btn');

                var $openInNewWindow = _this.$dialog.find('.sn-checkbox-open-in-new-window input[type=checkbox]');

                var $useProtocol = _this.$dialog.find('.sn-checkbox-use-protocol input[type=checkbox]');

                _this.ui.onDialogShown(_this.$dialog, function () {
                  _this.context.triggerEvent('dialog.shown'); // If no url was given and given text is valid URL then copy that into URL Field


                  if (!linkInfo.url && func.isValidUrl(linkInfo.text)) {
                    linkInfo.url = linkInfo.text;
                  }

                  $linkText.on('input paste propertychange', function () {
                    // If linktext was modified by input events,
                    // cloning text from linkUrl will be stopped.
                    linkInfo.text = $linkText.val();

                    _this.toggleLinkBtn($linkBtn, $linkText, $linkUrl);
                  }).val(linkInfo.text);
                  $linkUrl.on('input paste propertychange', function () {
                    // Display same text on `Text to display` as default
                    // when linktext has no text
                    if (!linkInfo.text) {
                      $linkText.val($linkUrl.val());
                    }

                    _this.toggleLinkBtn($linkBtn, $linkText, $linkUrl);
                  }).val(linkInfo.url);

                  if (!env.isSupportTouch) {
                    $linkUrl.trigger('focus');
                  }

                  _this.toggleLinkBtn($linkBtn, $linkText, $linkUrl);

                  _this.bindEnterKey($linkUrl, $linkBtn);

                  _this.bindEnterKey($linkText, $linkBtn);

                  var isNewWindowChecked = linkInfo.isNewWindow !== undefined ? linkInfo.isNewWindow : _this.context.options.linkTargetBlank;
                  $openInNewWindow.prop('checked', isNewWindowChecked);
                  var useProtocolChecked = linkInfo.url ? false : _this.context.options.useProtocol;
                  $useProtocol.prop('checked', useProtocolChecked);
                  $linkBtn.one('click', function (event) {
                    event.preventDefault();
                    deferred.resolve({
                      range: linkInfo.range,
                      url: $linkUrl.val(),
                      text: $linkText.val(),
                      isNewWindow: $openInNewWindow.is(':checked'),
                      checkProtocol: $useProtocol.is(':checked')
                    });

                    _this.ui.hideDialog(_this.$dialog);
                  });
                });

                _this.ui.onDialogHidden(_this.$dialog, function () {
                  // detach events
                  $linkText.off();
                  $linkUrl.off();
                  $linkBtn.off();

                  if (deferred.state() === 'pending') {
                    deferred.reject();
                  }
                });

                _this.ui.showDialog(_this.$dialog);
              }).promise();
            }
            /**
             * @param {Object} layoutInfo
             */

          }, {
            key: "show",
            value: function show() {
              var _this2 = this;

              var linkInfo = this.context.invoke('editor.getLinkInfo');
              this.context.invoke('editor.saveRange');
              this.showLinkDialog(linkInfo).then(function (linkInfo) {
                _this2.context.invoke('editor.restoreRange');

                _this2.context.invoke('editor.createLink', linkInfo);
              }).fail(function () {
                _this2.context.invoke('editor.restoreRange');
              });
            }
          }]);
          return LinkDialog;
        }(); // CONCATENATED MODULE: ./src/js/base/module/LinkPopover.js


        function LinkPopover_classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function LinkPopover_defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function LinkPopover_createClass(Constructor, protoProps, staticProps) {
          if (protoProps) LinkPopover_defineProperties(Constructor.prototype, protoProps);
          if (staticProps) LinkPopover_defineProperties(Constructor, staticProps);
          return Constructor;
        }

        var LinkPopover_LinkPopover = /*#__PURE__*/function () {
          function LinkPopover(context) {
            var _this = this;

            LinkPopover_classCallCheck(this, LinkPopover);
            this.context = context;
            this.ui = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.summernote.ui;
            this.options = context.options;
            this.events = {
              'summernote.keyup summernote.mouseup summernote.change summernote.scroll': function summernoteKeyupSummernoteMouseupSummernoteChangeSummernoteScroll() {
                _this.update();
              },
              'summernote.disable summernote.dialog.shown summernote.blur': function summernoteDisableSummernoteDialogShownSummernoteBlur() {
                _this.hide();
              }
            };
          }

          LinkPopover_createClass(LinkPopover, [{
            key: "shouldInitialize",
            value: function shouldInitialize() {
              return !lists.isEmpty(this.options.popover.link);
            }
          }, {
            key: "initialize",
            value: function initialize() {
              this.$popover = this.ui.popover({
                className: 'note-link-popover',
                callback: function callback($node) {
                  var $content = $node.find('.popover-content,.note-popover-content');
                  $content.prepend('<span><a target="_blank"></a>&nbsp;</span>');
                }
              }).render().appendTo(this.options.container);
              var $content = this.$popover.find('.popover-content,.note-popover-content');
              this.context.invoke('buttons.build', $content, this.options.popover.link);
              this.$popover.on('mousedown', function (e) {
                e.preventDefault();
              });
            }
          }, {
            key: "destroy",
            value: function destroy() {
              this.$popover.remove();
            }
          }, {
            key: "update",
            value: function update() {
              // Prevent focusing on editable when invoke('code') is executed
              if (!this.context.invoke('editor.hasFocus')) {
                this.hide();
                return;
              }

              var rng = this.context.invoke('editor.getLastRange');

              if (rng.isCollapsed() && rng.isOnAnchor()) {
                var anchor = dom.ancestor(rng.sc, dom.isAnchor);
                var href = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(anchor).attr('href');
                this.$popover.find('a').attr('href', href).text(href);
                var pos = dom.posFromPlaceholder(anchor);
                var containerOffset = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(this.options.container).offset();
                pos.top -= containerOffset.top;
                pos.left -= containerOffset.left;
                this.$popover.css({
                  display: 'block',
                  left: pos.left,
                  top: pos.top
                });
              } else {
                this.hide();
              }
            }
          }, {
            key: "hide",
            value: function hide() {
              this.$popover.hide();
            }
          }]);
          return LinkPopover;
        }(); // CONCATENATED MODULE: ./src/js/base/module/ImageDialog.js


        function ImageDialog_classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function ImageDialog_defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function ImageDialog_createClass(Constructor, protoProps, staticProps) {
          if (protoProps) ImageDialog_defineProperties(Constructor.prototype, protoProps);
          if (staticProps) ImageDialog_defineProperties(Constructor, staticProps);
          return Constructor;
        }

        var ImageDialog_ImageDialog = /*#__PURE__*/function () {
          function ImageDialog(context) {
            ImageDialog_classCallCheck(this, ImageDialog);
            this.context = context;
            this.ui = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.summernote.ui;
            this.$body = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(document.body);
            this.$editor = context.layoutInfo.editor;
            this.options = context.options;
            this.lang = this.options.langInfo;
          }

          ImageDialog_createClass(ImageDialog, [{
            key: "initialize",
            value: function initialize() {
              var imageLimitation = '';

              if (this.options.maximumImageFileSize) {
                var unit = Math.floor(Math.log(this.options.maximumImageFileSize) / Math.log(1024));
                var readableSize = (this.options.maximumImageFileSize / Math.pow(1024, unit)).toFixed(2) * 1 + ' ' + ' KMGTP'[unit] + 'B';
                imageLimitation = "<small>".concat(this.lang.image.maximumFileSize + ' : ' + readableSize, "</small>");
              }

              var $container = this.options.dialogsInBody ? this.$body : this.options.container;
              var body = ['<div class="form-group note-form-group note-group-select-from-files">', '<label for="note-dialog-image-file-' + this.options.id + '" class="note-form-label">' + this.lang.image.selectFromFiles + '</label>', '<input id="note-dialog-image-file-' + this.options.id + '" class="note-image-input form-control-file note-form-control note-input" ', ' type="file" name="files" accept="image/*" multiple="multiple"/>', imageLimitation, '</div>', '<div class="form-group note-group-image-url">', '<label for="note-dialog-image-url-' + this.options.id + '" class="note-form-label">' + this.lang.image.url + '</label>', '<input id="note-dialog-image-url-' + this.options.id + '" class="note-image-url form-control note-form-control note-input" type="text"/>', '</div>'].join('');
              var buttonClass = 'btn btn-primary note-btn note-btn-primary note-image-btn';
              var footer = "<input type=\"button\" href=\"#\" class=\"".concat(buttonClass, "\" value=\"").concat(this.lang.image.insert, "\" disabled>");
              this.$dialog = this.ui.dialog({
                title: this.lang.image.insert,
                fade: this.options.dialogsFade,
                body: body,
                footer: footer
              }).render().appendTo($container);
            }
          }, {
            key: "destroy",
            value: function destroy() {
              this.ui.hideDialog(this.$dialog);
              this.$dialog.remove();
            }
          }, {
            key: "bindEnterKey",
            value: function bindEnterKey($input, $btn) {
              $input.on('keypress', function (event) {
                if (event.keyCode === core_key.code.ENTER) {
                  event.preventDefault();
                  $btn.trigger('click');
                }
              });
            }
          }, {
            key: "show",
            value: function show() {
              var _this = this;

              this.context.invoke('editor.saveRange');
              this.showImageDialog().then(function (data) {
                // [workaround] hide dialog before restore range for IE range focus
                _this.ui.hideDialog(_this.$dialog);

                _this.context.invoke('editor.restoreRange');

                if (typeof data === 'string') {
                  // image url
                  // If onImageLinkInsert set,
                  if (_this.options.callbacks.onImageLinkInsert) {
                    _this.context.triggerEvent('image.link.insert', data);
                  } else {
                    _this.context.invoke('editor.insertImage', data);
                  }
                } else {
                  // array of files
                  _this.context.invoke('editor.insertImagesOrCallback', data);
                }
              }).fail(function () {
                _this.context.invoke('editor.restoreRange');
              });
            }
            /**
             * show image dialog
             *
             * @param {jQuery} $dialog
             * @return {Promise}
             */

          }, {
            key: "showImageDialog",
            value: function showImageDialog() {
              var _this2 = this;

              return external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.Deferred(function (deferred) {
                var $imageInput = _this2.$dialog.find('.note-image-input');

                var $imageUrl = _this2.$dialog.find('.note-image-url');

                var $imageBtn = _this2.$dialog.find('.note-image-btn');

                _this2.ui.onDialogShown(_this2.$dialog, function () {
                  _this2.context.triggerEvent('dialog.shown'); // Cloning imageInput to clear element.


                  $imageInput.replaceWith($imageInput.clone().on('change', function (event) {
                    deferred.resolve(event.target.files || event.target.value);
                  }).val(''));
                  $imageUrl.on('input paste propertychange', function () {
                    _this2.ui.toggleBtn($imageBtn, $imageUrl.val());
                  }).val('');

                  if (!env.isSupportTouch) {
                    $imageUrl.trigger('focus');
                  }

                  $imageBtn.click(function (event) {
                    event.preventDefault();
                    deferred.resolve($imageUrl.val());
                  });

                  _this2.bindEnterKey($imageUrl, $imageBtn);
                });

                _this2.ui.onDialogHidden(_this2.$dialog, function () {
                  $imageInput.off();
                  $imageUrl.off();
                  $imageBtn.off();

                  if (deferred.state() === 'pending') {
                    deferred.reject();
                  }
                });

                _this2.ui.showDialog(_this2.$dialog);
              });
            }
          }]);
          return ImageDialog;
        }(); // CONCATENATED MODULE: ./src/js/base/module/ImagePopover.js


        function ImagePopover_classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function ImagePopover_defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function ImagePopover_createClass(Constructor, protoProps, staticProps) {
          if (protoProps) ImagePopover_defineProperties(Constructor.prototype, protoProps);
          if (staticProps) ImagePopover_defineProperties(Constructor, staticProps);
          return Constructor;
        }
        /**
         * Image popover module
         *  mouse events that show/hide popover will be handled by Handle.js.
         *  Handle.js will receive the events and invoke 'imagePopover.update'.
         */


        var ImagePopover_ImagePopover = /*#__PURE__*/function () {
          function ImagePopover(context) {
            var _this = this;

            ImagePopover_classCallCheck(this, ImagePopover);
            this.context = context;
            this.ui = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.summernote.ui;
            this.editable = context.layoutInfo.editable[0];
            this.options = context.options;
            this.events = {
              'summernote.disable summernote.blur': function summernoteDisableSummernoteBlur() {
                _this.hide();
              }
            };
          }

          ImagePopover_createClass(ImagePopover, [{
            key: "shouldInitialize",
            value: function shouldInitialize() {
              return !lists.isEmpty(this.options.popover.image);
            }
          }, {
            key: "initialize",
            value: function initialize() {
              this.$popover = this.ui.popover({
                className: 'note-image-popover'
              }).render().appendTo(this.options.container);
              var $content = this.$popover.find('.popover-content,.note-popover-content');
              this.context.invoke('buttons.build', $content, this.options.popover.image);
              this.$popover.on('mousedown', function (e) {
                e.preventDefault();
              });
            }
          }, {
            key: "destroy",
            value: function destroy() {
              this.$popover.remove();
            }
          }, {
            key: "update",
            value: function update(target, event) {
              if (dom.isImg(target)) {
                var position = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(target).offset();
                var containerOffset = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(this.options.container).offset();
                var pos = {};

                if (this.options.popatmouse) {
                  pos.left = event.pageX - 20;
                  pos.top = event.pageY;
                } else {
                  pos = position;
                }

                pos.top -= containerOffset.top;
                pos.left -= containerOffset.left;
                this.$popover.css({
                  display: 'block',
                  left: pos.left,
                  top: pos.top
                });
              } else {
                this.hide();
              }
            }
          }, {
            key: "hide",
            value: function hide() {
              this.$popover.hide();
            }
          }]);
          return ImagePopover;
        }(); // CONCATENATED MODULE: ./src/js/base/module/TablePopover.js


        function TablePopover_classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function TablePopover_defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function TablePopover_createClass(Constructor, protoProps, staticProps) {
          if (protoProps) TablePopover_defineProperties(Constructor.prototype, protoProps);
          if (staticProps) TablePopover_defineProperties(Constructor, staticProps);
          return Constructor;
        }

        var TablePopover_TablePopover = /*#__PURE__*/function () {
          function TablePopover(context) {
            var _this = this;

            TablePopover_classCallCheck(this, TablePopover);
            this.context = context;
            this.ui = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.summernote.ui;
            this.options = context.options;
            this.events = {
              'summernote.mousedown': function summernoteMousedown(we, e) {
                _this.update(e.target);
              },
              'summernote.keyup summernote.scroll summernote.change': function summernoteKeyupSummernoteScrollSummernoteChange() {
                _this.update();
              },
              'summernote.disable summernote.blur': function summernoteDisableSummernoteBlur() {
                _this.hide();
              }
            };
          }

          TablePopover_createClass(TablePopover, [{
            key: "shouldInitialize",
            value: function shouldInitialize() {
              return !lists.isEmpty(this.options.popover.table);
            }
          }, {
            key: "initialize",
            value: function initialize() {
              this.$popover = this.ui.popover({
                className: 'note-table-popover'
              }).render().appendTo(this.options.container);
              var $content = this.$popover.find('.popover-content,.note-popover-content');
              this.context.invoke('buttons.build', $content, this.options.popover.table); // [workaround] Disable Firefox's default table editor

              if (env.isFF) {
                document.execCommand('enableInlineTableEditing', false, false);
              }

              this.$popover.on('mousedown', function (e) {
                e.preventDefault();
              });
            }
          }, {
            key: "destroy",
            value: function destroy() {
              this.$popover.remove();
            }
          }, {
            key: "update",
            value: function update(target) {
              if (this.context.isDisabled()) {
                return false;
              }

              var isCell = dom.isCell(target);

              if (isCell) {
                var pos = dom.posFromPlaceholder(target);
                var containerOffset = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(this.options.container).offset();
                pos.top -= containerOffset.top;
                pos.left -= containerOffset.left;
                this.$popover.css({
                  display: 'block',
                  left: pos.left,
                  top: pos.top
                });
              } else {
                this.hide();
              }

              return isCell;
            }
          }, {
            key: "hide",
            value: function hide() {
              this.$popover.hide();
            }
          }]);
          return TablePopover;
        }(); // CONCATENATED MODULE: ./src/js/base/module/VideoDialog.js


        function VideoDialog_classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function VideoDialog_defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function VideoDialog_createClass(Constructor, protoProps, staticProps) {
          if (protoProps) VideoDialog_defineProperties(Constructor.prototype, protoProps);
          if (staticProps) VideoDialog_defineProperties(Constructor, staticProps);
          return Constructor;
        }

        var VideoDialog_VideoDialog = /*#__PURE__*/function () {
          function VideoDialog(context) {
            VideoDialog_classCallCheck(this, VideoDialog);
            this.context = context;
            this.ui = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.summernote.ui;
            this.$body = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(document.body);
            this.$editor = context.layoutInfo.editor;
            this.options = context.options;
            this.lang = this.options.langInfo;
          }

          VideoDialog_createClass(VideoDialog, [{
            key: "initialize",
            value: function initialize() {
              var $container = this.options.dialogsInBody ? this.$body : this.options.container;
              var body = ['<div class="form-group note-form-group row-fluid">', "<label for=\"note-dialog-video-url-".concat(this.options.id, "\" class=\"note-form-label\">").concat(this.lang.video.url, " <small class=\"text-muted\">").concat(this.lang.video.providers, "</small></label>"), "<input id=\"note-dialog-video-url-".concat(this.options.id, "\" class=\"note-video-url form-control note-form-control note-input\" type=\"text\"/>"), '</div>'].join('');
              var buttonClass = 'btn btn-primary note-btn note-btn-primary note-video-btn';
              var footer = "<input type=\"button\" href=\"#\" class=\"".concat(buttonClass, "\" value=\"").concat(this.lang.video.insert, "\" disabled>");
              this.$dialog = this.ui.dialog({
                title: this.lang.video.insert,
                fade: this.options.dialogsFade,
                body: body,
                footer: footer
              }).render().appendTo($container);
            }
          }, {
            key: "destroy",
            value: function destroy() {
              this.ui.hideDialog(this.$dialog);
              this.$dialog.remove();
            }
          }, {
            key: "bindEnterKey",
            value: function bindEnterKey($input, $btn) {
              $input.on('keypress', function (event) {
                if (event.keyCode === core_key.code.ENTER) {
                  event.preventDefault();
                  $btn.trigger('click');
                }
              });
            }
          }, {
            key: "createVideoNode",
            value: function createVideoNode(url) {
              // video url patterns(youtube, instagram, vimeo, dailymotion, youku, mp4, ogg, webm)
              var ytRegExp = /\/\/(?:(?:www|m)\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w|-]{11})(?:(?:[\?&]t=)(\S+))?$/;
              var ytRegExpForStart = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/;
              var ytMatch = url.match(ytRegExp);
              var igRegExp = /(?:www\.|\/\/)instagram\.com\/p\/(.[a-zA-Z0-9_-]*)/;
              var igMatch = url.match(igRegExp);
              var vRegExp = /\/\/vine\.co\/v\/([a-zA-Z0-9]+)/;
              var vMatch = url.match(vRegExp);
              var vimRegExp = /\/\/(player\.)?vimeo\.com\/([a-z]*\/)*(\d+)[?]?.*/;
              var vimMatch = url.match(vimRegExp);
              var dmRegExp = /.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/;
              var dmMatch = url.match(dmRegExp);
              var youkuRegExp = /\/\/v\.youku\.com\/v_show\/id_(\w+)=*\.html/;
              var youkuMatch = url.match(youkuRegExp);
              var qqRegExp = /\/\/v\.qq\.com.*?vid=(.+)/;
              var qqMatch = url.match(qqRegExp);
              var qqRegExp2 = /\/\/v\.qq\.com\/x?\/?(page|cover).*?\/([^\/]+)\.html\??.*/;
              var qqMatch2 = url.match(qqRegExp2);
              var mp4RegExp = /^.+.(mp4|m4v)$/;
              var mp4Match = url.match(mp4RegExp);
              var oggRegExp = /^.+.(ogg|ogv)$/;
              var oggMatch = url.match(oggRegExp);
              var webmRegExp = /^.+.(webm)$/;
              var webmMatch = url.match(webmRegExp);
              var fbRegExp = /(?:www\.|\/\/)facebook\.com\/([^\/]+)\/videos\/([0-9]+)/;
              var fbMatch = url.match(fbRegExp);
              var $video;

              if (ytMatch && ytMatch[1].length === 11) {
                var youtubeId = ytMatch[1];
                var start = 0;

                if (typeof ytMatch[2] !== 'undefined') {
                  var ytMatchForStart = ytMatch[2].match(ytRegExpForStart);

                  if (ytMatchForStart) {
                    for (var n = [3600, 60, 1], i = 0, r = n.length; i < r; i++) {
                      start += typeof ytMatchForStart[i + 1] !== 'undefined' ? n[i] * parseInt(ytMatchForStart[i + 1], 10) : 0;
                    }
                  }
                }

                $video = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()('<iframe>').attr('frameborder', 0).attr('src', '//www.youtube.com/embed/' + youtubeId + (start > 0 ? '?start=' + start : '')).attr('width', '640').attr('height', '360');
              } else if (igMatch && igMatch[0].length) {
                $video = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()('<iframe>').attr('frameborder', 0).attr('src', 'https://instagram.com/p/' + igMatch[1] + '/embed/').attr('width', '612').attr('height', '710').attr('scrolling', 'no').attr('allowtransparency', 'true');
              } else if (vMatch && vMatch[0].length) {
                $video = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()('<iframe>').attr('frameborder', 0).attr('src', vMatch[0] + '/embed/simple').attr('width', '600').attr('height', '600').attr('class', 'vine-embed');
              } else if (vimMatch && vimMatch[3].length) {
                $video = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()('<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>').attr('frameborder', 0).attr('src', '//player.vimeo.com/video/' + vimMatch[3]).attr('width', '640').attr('height', '360');
              } else if (dmMatch && dmMatch[2].length) {
                $video = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()('<iframe>').attr('frameborder', 0).attr('src', '//www.dailymotion.com/embed/video/' + dmMatch[2]).attr('width', '640').attr('height', '360');
              } else if (youkuMatch && youkuMatch[1].length) {
                $video = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()('<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>').attr('frameborder', 0).attr('height', '498').attr('width', '510').attr('src', '//player.youku.com/embed/' + youkuMatch[1]);
              } else if (qqMatch && qqMatch[1].length || qqMatch2 && qqMatch2[2].length) {
                var vid = qqMatch && qqMatch[1].length ? qqMatch[1] : qqMatch2[2];
                $video = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()('<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>').attr('frameborder', 0).attr('height', '310').attr('width', '500').attr('src', 'https://v.qq.com/txp/iframe/player.html?vid=' + vid + '&amp;auto=0');
              } else if (mp4Match || oggMatch || webmMatch) {
                $video = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()('<video controls>').attr('src', url).attr('width', '640').attr('height', '360');
              } else if (fbMatch && fbMatch[0].length) {
                $video = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()('<iframe>').attr('frameborder', 0).attr('src', 'https://www.facebook.com/plugins/video.php?href=' + encodeURIComponent(fbMatch[0]) + '&show_text=0&width=560').attr('width', '560').attr('height', '301').attr('scrolling', 'no').attr('allowtransparency', 'true');
              } else {
                // this is not a known video link. Now what, Cat? Now what?
                return false;
              }

              $video.addClass('note-video-clip');
              return $video[0];
            }
          }, {
            key: "show",
            value: function show() {
              var _this = this;

              var text = this.context.invoke('editor.getSelectedText');
              this.context.invoke('editor.saveRange');
              this.showVideoDialog(text).then(function (url) {
                // [workaround] hide dialog before restore range for IE range focus
                _this.ui.hideDialog(_this.$dialog);

                _this.context.invoke('editor.restoreRange'); // build node


                var $node = _this.createVideoNode(url);

                if ($node) {
                  // insert video node
                  _this.context.invoke('editor.insertNode', $node);
                }
              }).fail(function () {
                _this.context.invoke('editor.restoreRange');
              });
            }
            /**
             * show video dialog
             *
             * @param {jQuery} $dialog
             * @return {Promise}
             */

          }, {
            key: "showVideoDialog",
            value: function showVideoDialog()
            /* text */
            {
              var _this2 = this;

              return external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.Deferred(function (deferred) {
                var $videoUrl = _this2.$dialog.find('.note-video-url');

                var $videoBtn = _this2.$dialog.find('.note-video-btn');

                _this2.ui.onDialogShown(_this2.$dialog, function () {
                  _this2.context.triggerEvent('dialog.shown');

                  $videoUrl.on('input paste propertychange', function () {
                    _this2.ui.toggleBtn($videoBtn, $videoUrl.val());
                  });

                  if (!env.isSupportTouch) {
                    $videoUrl.trigger('focus');
                  }

                  $videoBtn.click(function (event) {
                    event.preventDefault();
                    deferred.resolve($videoUrl.val());
                  });

                  _this2.bindEnterKey($videoUrl, $videoBtn);
                });

                _this2.ui.onDialogHidden(_this2.$dialog, function () {
                  $videoUrl.off();
                  $videoBtn.off();

                  if (deferred.state() === 'pending') {
                    deferred.reject();
                  }
                });

                _this2.ui.showDialog(_this2.$dialog);
              });
            }
          }]);
          return VideoDialog;
        }(); // CONCATENATED MODULE: ./src/js/base/module/HelpDialog.js


        function HelpDialog_classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function HelpDialog_defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function HelpDialog_createClass(Constructor, protoProps, staticProps) {
          if (protoProps) HelpDialog_defineProperties(Constructor.prototype, protoProps);
          if (staticProps) HelpDialog_defineProperties(Constructor, staticProps);
          return Constructor;
        }

        var HelpDialog_HelpDialog = /*#__PURE__*/function () {
          function HelpDialog(context) {
            HelpDialog_classCallCheck(this, HelpDialog);
            this.context = context;
            this.ui = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.summernote.ui;
            this.$body = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(document.body);
            this.$editor = context.layoutInfo.editor;
            this.options = context.options;
            this.lang = this.options.langInfo;
          }

          HelpDialog_createClass(HelpDialog, [{
            key: "initialize",
            value: function initialize() {
              var $container = this.options.dialogsInBody ? this.$body : this.options.container;
              var body = ['<p class="text-center">', '<a href="http://summernote.org/" target="_blank">Summernote 0.8.18</a> · ', '<a href="https://github.com/summernote/summernote" target="_blank">Project</a> · ', '<a href="https://github.com/summernote/summernote/issues" target="_blank">Issues</a>', '</p>'].join('');
              this.$dialog = this.ui.dialog({
                title: this.lang.options.help,
                fade: this.options.dialogsFade,
                body: this.createShortcutList(),
                footer: body,
                callback: function callback($node) {
                  $node.find('.modal-body,.note-modal-body').css({
                    'max-height': 300,
                    'overflow': 'scroll'
                  });
                }
              }).render().appendTo($container);
            }
          }, {
            key: "destroy",
            value: function destroy() {
              this.ui.hideDialog(this.$dialog);
              this.$dialog.remove();
            }
          }, {
            key: "createShortcutList",
            value: function createShortcutList() {
              var _this = this;

              var keyMap = this.options.keyMap[env.isMac ? 'mac' : 'pc'];
              return Object.keys(keyMap).map(function (key) {
                var command = keyMap[key];
                var $row = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()('<div><div class="help-list-item"></div></div>');
                $row.append(external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()('<label><kbd>' + key + '</kdb></label>').css({
                  'width': 180,
                  'margin-right': 10
                })).append(external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()('<span/>').html(_this.context.memo('help.' + command) || command));
                return $row.html();
              }).join('');
            }
            /**
             * show help dialog
             *
             * @return {Promise}
             */

          }, {
            key: "showHelpDialog",
            value: function showHelpDialog() {
              var _this2 = this;

              return external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.Deferred(function (deferred) {
                _this2.ui.onDialogShown(_this2.$dialog, function () {
                  _this2.context.triggerEvent('dialog.shown');

                  deferred.resolve();
                });

                _this2.ui.showDialog(_this2.$dialog);
              }).promise();
            }
          }, {
            key: "show",
            value: function show() {
              var _this3 = this;

              this.context.invoke('editor.saveRange');
              this.showHelpDialog().then(function () {
                _this3.context.invoke('editor.restoreRange');
              });
            }
          }]);
          return HelpDialog;
        }(); // CONCATENATED MODULE: ./src/js/base/module/AirPopover.js


        function AirPopover_classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function AirPopover_defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function AirPopover_createClass(Constructor, protoProps, staticProps) {
          if (protoProps) AirPopover_defineProperties(Constructor.prototype, protoProps);
          if (staticProps) AirPopover_defineProperties(Constructor, staticProps);
          return Constructor;
        }

        var AIRMODE_POPOVER_X_OFFSET = -5;
        var AIRMODE_POPOVER_Y_OFFSET = 5;

        var AirPopover_AirPopover = /*#__PURE__*/function () {
          function AirPopover(context) {
            var _this = this;

            AirPopover_classCallCheck(this, AirPopover);
            this.context = context;
            this.ui = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.summernote.ui;
            this.options = context.options;
            this.hidable = true;
            this.onContextmenu = false;
            this.pageX = null;
            this.pageY = null;
            this.events = {
              'summernote.contextmenu': function summernoteContextmenu(e) {
                if (_this.options.editing) {
                  e.preventDefault();
                  e.stopPropagation();
                  _this.onContextmenu = true;

                  _this.update(true);
                }
              },
              'summernote.mousedown': function summernoteMousedown(we, e) {
                _this.pageX = e.pageX;
                _this.pageY = e.pageY;
              },
              'summernote.keyup summernote.mouseup summernote.scroll': function summernoteKeyupSummernoteMouseupSummernoteScroll(we, e) {
                if (_this.options.editing && !_this.onContextmenu) {
                  _this.pageX = e.pageX;
                  _this.pageY = e.pageY;

                  _this.update();
                }

                _this.onContextmenu = false;
              },
              'summernote.disable summernote.change summernote.dialog.shown summernote.blur': function summernoteDisableSummernoteChangeSummernoteDialogShownSummernoteBlur() {
                _this.hide();
              },
              'summernote.focusout': function summernoteFocusout() {
                if (!_this.$popover.is(':active,:focus')) {
                  _this.hide();
                }
              }
            };
          }

          AirPopover_createClass(AirPopover, [{
            key: "shouldInitialize",
            value: function shouldInitialize() {
              return this.options.airMode && !lists.isEmpty(this.options.popover.air);
            }
          }, {
            key: "initialize",
            value: function initialize() {
              var _this2 = this;

              this.$popover = this.ui.popover({
                className: 'note-air-popover'
              }).render().appendTo(this.options.container);
              var $content = this.$popover.find('.popover-content');
              this.context.invoke('buttons.build', $content, this.options.popover.air); // disable hiding this popover preemptively by 'summernote.blur' event.

              this.$popover.on('mousedown', function () {
                _this2.hidable = false;
              }); // (re-)enable hiding after 'summernote.blur' has been handled (aka. ignored).

              this.$popover.on('mouseup', function () {
                _this2.hidable = true;
              });
            }
          }, {
            key: "destroy",
            value: function destroy() {
              this.$popover.remove();
            }
          }, {
            key: "update",
            value: function update(forcelyOpen) {
              var styleInfo = this.context.invoke('editor.currentStyle');

              if (styleInfo.range && (!styleInfo.range.isCollapsed() || forcelyOpen)) {
                var rect = {
                  left: this.pageX,
                  top: this.pageY
                };
                var containerOffset = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(this.options.container).offset();
                rect.top -= containerOffset.top;
                rect.left -= containerOffset.left;
                this.$popover.css({
                  display: 'block',
                  left: Math.max(rect.left, 0) + AIRMODE_POPOVER_X_OFFSET,
                  top: rect.top + AIRMODE_POPOVER_Y_OFFSET
                });
                this.context.invoke('buttons.updateCurrentStyle', this.$popover);
              } else {
                this.hide();
              }
            }
          }, {
            key: "updateCodeview",
            value: function updateCodeview(isCodeview) {
              this.ui.toggleBtnActive(this.$popover.find('.btn-codeview'), isCodeview);

              if (isCodeview) {
                this.hide();
              }
            }
          }, {
            key: "hide",
            value: function hide() {
              if (this.hidable) {
                this.$popover.hide();
              }
            }
          }]);
          return AirPopover;
        }(); // CONCATENATED MODULE: ./src/js/base/module/HintPopover.js


        function HintPopover_classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function HintPopover_defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function HintPopover_createClass(Constructor, protoProps, staticProps) {
          if (protoProps) HintPopover_defineProperties(Constructor.prototype, protoProps);
          if (staticProps) HintPopover_defineProperties(Constructor, staticProps);
          return Constructor;
        }

        var POPOVER_DIST = 5;

        var HintPopover_HintPopover = /*#__PURE__*/function () {
          function HintPopover(context) {
            var _this = this;

            HintPopover_classCallCheck(this, HintPopover);
            this.context = context;
            this.ui = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.summernote.ui;
            this.$editable = context.layoutInfo.editable;
            this.options = context.options;
            this.hint = this.options.hint || [];
            this.direction = this.options.hintDirection || 'bottom';
            this.hints = Array.isArray(this.hint) ? this.hint : [this.hint];
            this.events = {
              'summernote.keyup': function summernoteKeyup(we, e) {
                if (!e.isDefaultPrevented()) {
                  _this.handleKeyup(e);
                }
              },
              'summernote.keydown': function summernoteKeydown(we, e) {
                _this.handleKeydown(e);
              },
              'summernote.disable summernote.dialog.shown summernote.blur': function summernoteDisableSummernoteDialogShownSummernoteBlur() {
                _this.hide();
              }
            };
          }

          HintPopover_createClass(HintPopover, [{
            key: "shouldInitialize",
            value: function shouldInitialize() {
              return this.hints.length > 0;
            }
          }, {
            key: "initialize",
            value: function initialize() {
              var _this2 = this;

              this.lastWordRange = null;
              this.matchingWord = null;
              this.$popover = this.ui.popover({
                className: 'note-hint-popover',
                hideArrow: true,
                direction: ''
              }).render().appendTo(this.options.container);
              this.$popover.hide();
              this.$content = this.$popover.find('.popover-content,.note-popover-content');
              this.$content.on('click', '.note-hint-item', function (e) {
                _this2.$content.find('.active').removeClass('active');

                external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(e.currentTarget).addClass('active');

                _this2.replace();
              });
              this.$popover.on('mousedown', function (e) {
                e.preventDefault();
              });
            }
          }, {
            key: "destroy",
            value: function destroy() {
              this.$popover.remove();
            }
          }, {
            key: "selectItem",
            value: function selectItem($item) {
              this.$content.find('.active').removeClass('active');
              $item.addClass('active');
              this.$content[0].scrollTop = $item[0].offsetTop - this.$content.innerHeight() / 2;
            }
          }, {
            key: "moveDown",
            value: function moveDown() {
              var $current = this.$content.find('.note-hint-item.active');
              var $next = $current.next();

              if ($next.length) {
                this.selectItem($next);
              } else {
                var $nextGroup = $current.parent().next();

                if (!$nextGroup.length) {
                  $nextGroup = this.$content.find('.note-hint-group').first();
                }

                this.selectItem($nextGroup.find('.note-hint-item').first());
              }
            }
          }, {
            key: "moveUp",
            value: function moveUp() {
              var $current = this.$content.find('.note-hint-item.active');
              var $prev = $current.prev();

              if ($prev.length) {
                this.selectItem($prev);
              } else {
                var $prevGroup = $current.parent().prev();

                if (!$prevGroup.length) {
                  $prevGroup = this.$content.find('.note-hint-group').last();
                }

                this.selectItem($prevGroup.find('.note-hint-item').last());
              }
            }
          }, {
            key: "replace",
            value: function replace() {
              var $item = this.$content.find('.note-hint-item.active');

              if ($item.length) {
                var node = this.nodeFromItem($item); // If matchingWord length = 0 -> capture OK / open hint / but as mention capture "" (\w*)

                if (this.matchingWord !== null && this.matchingWord.length === 0) {
                  this.lastWordRange.so = this.lastWordRange.eo; // Else si > 0 and normal case -> adjust range "before" for correct position of insertion
                } else if (this.matchingWord !== null && this.matchingWord.length > 0 && !this.lastWordRange.isCollapsed()) {
                  var rangeCompute = this.lastWordRange.eo - this.lastWordRange.so - this.matchingWord.length;

                  if (rangeCompute > 0) {
                    this.lastWordRange.so += rangeCompute;
                  }
                }

                this.lastWordRange.insertNode(node);

                if (this.options.hintSelect === 'next') {
                  var blank = document.createTextNode('');
                  external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(node).after(blank);
                  range.createFromNodeBefore(blank).select();
                } else {
                  range.createFromNodeAfter(node).select();
                }

                this.lastWordRange = null;
                this.hide();
                this.context.invoke('editor.focus');
              }
            }
          }, {
            key: "nodeFromItem",
            value: function nodeFromItem($item) {
              var hint = this.hints[$item.data('index')];
              var item = $item.data('item');
              var node = hint.content ? hint.content(item) : item;

              if (typeof node === 'string') {
                node = dom.createText(node);
              }

              return node;
            }
          }, {
            key: "createItemTemplates",
            value: function createItemTemplates(hintIdx, items) {
              var hint = this.hints[hintIdx];
              return items.map(function (item
              /*, idx */
              ) {
                var $item = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()('<div class="note-hint-item"/>');
                $item.append(hint.template ? hint.template(item) : item + '');
                $item.data({
                  'index': hintIdx,
                  'item': item
                });
                return $item;
              });
            }
          }, {
            key: "handleKeydown",
            value: function handleKeydown(e) {
              if (!this.$popover.is(':visible')) {
                return;
              }

              if (e.keyCode === core_key.code.ENTER) {
                e.preventDefault();
                this.replace();
              } else if (e.keyCode === core_key.code.UP) {
                e.preventDefault();
                this.moveUp();
              } else if (e.keyCode === core_key.code.DOWN) {
                e.preventDefault();
                this.moveDown();
              }
            }
          }, {
            key: "searchKeyword",
            value: function searchKeyword(index, keyword, callback) {
              var hint = this.hints[index];

              if (hint && hint.match.test(keyword) && hint.search) {
                var matches = hint.match.exec(keyword);
                this.matchingWord = matches[0];
                hint.search(matches[1], callback);
              } else {
                callback();
              }
            }
          }, {
            key: "createGroup",
            value: function createGroup(idx, keyword) {
              var _this3 = this;

              var $group = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()('<div class="note-hint-group note-hint-group-' + idx + '"></div>');
              this.searchKeyword(idx, keyword, function (items) {
                items = items || [];

                if (items.length) {
                  $group.html(_this3.createItemTemplates(idx, items));

                  _this3.show();
                }
              });
              return $group;
            }
          }, {
            key: "handleKeyup",
            value: function handleKeyup(e) {
              var _this4 = this;

              if (!lists.contains([core_key.code.ENTER, core_key.code.UP, core_key.code.DOWN], e.keyCode)) {
                var _range = this.context.invoke('editor.getLastRange');

                var wordRange, keyword;

                if (this.options.hintMode === 'words') {
                  wordRange = _range.getWordsRange(_range);
                  keyword = wordRange.toString();
                  this.hints.forEach(function (hint) {
                    if (hint.match.test(keyword)) {
                      wordRange = _range.getWordsMatchRange(hint.match);
                      return false;
                    }
                  });

                  if (!wordRange) {
                    this.hide();
                    return;
                  }

                  keyword = wordRange.toString();
                } else {
                  wordRange = _range.getWordRange();
                  keyword = wordRange.toString();
                }

                if (this.hints.length && keyword) {
                  this.$content.empty();
                  var bnd = func.rect2bnd(lists.last(wordRange.getClientRects()));
                  var containerOffset = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(this.options.container).offset();

                  if (bnd) {
                    bnd.top -= containerOffset.top;
                    bnd.left -= containerOffset.left;
                    this.$popover.hide();
                    this.lastWordRange = wordRange;
                    this.hints.forEach(function (hint, idx) {
                      if (hint.match.test(keyword)) {
                        _this4.createGroup(idx, keyword).appendTo(_this4.$content);
                      }
                    }); // select first .note-hint-item

                    this.$content.find('.note-hint-item:first').addClass('active'); // set position for popover after group is created

                    if (this.direction === 'top') {
                      this.$popover.css({
                        left: bnd.left,
                        top: bnd.top - this.$popover.outerHeight() - POPOVER_DIST
                      });
                    } else {
                      this.$popover.css({
                        left: bnd.left,
                        top: bnd.top + bnd.height + POPOVER_DIST
                      });
                    }
                  }
                } else {
                  this.hide();
                }
              }
            }
          }, {
            key: "show",
            value: function show() {
              this.$popover.show();
            }
          }, {
            key: "hide",
            value: function hide() {
              this.$popover.hide();
            }
          }]);
          return HintPopover;
        }(); // CONCATENATED MODULE: ./src/js/base/settings.js


        external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.summernote = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.extend(external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.summernote, {
          version: '0.8.18',
          plugins: {},
          dom: dom,
          range: range,
          lists: lists,
          options: {
            langInfo: external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.summernote.lang['en-US'],
            editing: true,
            modules: {
              'editor': Editor_Editor,
              'clipboard': Clipboard_Clipboard,
              'dropzone': Dropzone_Dropzone,
              'codeview': Codeview_CodeView,
              'statusbar': Statusbar_Statusbar,
              'fullscreen': Fullscreen_Fullscreen,
              'handle': Handle_Handle,
              // FIXME: HintPopover must be front of autolink
              //  - Script error about range when Enter key is pressed on hint popover
              'hintPopover': HintPopover_HintPopover,
              'autoLink': AutoLink_AutoLink,
              'autoSync': AutoSync_AutoSync,
              'autoReplace': AutoReplace_AutoReplace,
              'placeholder': Placeholder_Placeholder,
              'buttons': Buttons_Buttons,
              'toolbar': Toolbar_Toolbar,
              'linkDialog': LinkDialog_LinkDialog,
              'linkPopover': LinkPopover_LinkPopover,
              'imageDialog': ImageDialog_ImageDialog,
              'imagePopover': ImagePopover_ImagePopover,
              'tablePopover': TablePopover_TablePopover,
              'videoDialog': VideoDialog_VideoDialog,
              'helpDialog': HelpDialog_HelpDialog,
              'airPopover': AirPopover_AirPopover
            },
            buttons: {},
            lang: 'en-US',
            followingToolbar: false,
            toolbarPosition: 'top',
            otherStaticBar: '',
            // toolbar
            codeviewKeepButton: false,
            toolbar: [['style', ['style']], ['font', ['bold', 'underline', 'clear']], ['fontname', ['fontname']], ['color', ['color']], ['para', ['ul', 'ol', 'paragraph']], ['table', ['table']], ['insert', ['link', 'picture', 'video']], ['view', ['fullscreen', 'codeview', 'help']]],
            // popover
            popatmouse: true,
            popover: {
              image: [['resize', ['resizeFull', 'resizeHalf', 'resizeQuarter', 'resizeNone']], ['float', ['floatLeft', 'floatRight', 'floatNone']], ['remove', ['removeMedia']]],
              link: [['link', ['linkDialogShow', 'unlink']]],
              table: [['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']], ['delete', ['deleteRow', 'deleteCol', 'deleteTable']]],
              air: [['color', ['color']], ['font', ['bold', 'underline', 'clear']], ['para', ['ul', 'paragraph']], ['table', ['table']], ['insert', ['link', 'picture']], ['view', ['fullscreen', 'codeview']]]
            },
            // air mode: inline editor
            airMode: false,
            overrideContextMenu: false,
            // TBD
            width: null,
            height: null,
            linkTargetBlank: true,
            useProtocol: true,
            defaultProtocol: 'http://',
            focus: false,
            tabDisabled: false,
            tabSize: 4,
            styleWithCSS: false,
            shortcuts: true,
            textareaAutoSync: true,
            tooltip: 'auto',
            container: null,
            maxTextLength: 0,
            blockquoteBreakingLevel: 2,
            spellCheck: true,
            disableGrammar: false,
            placeholder: null,
            inheritPlaceholder: false,
            // TODO: need to be documented
            recordEveryKeystroke: false,
            historyLimit: 200,
            // TODO: need to be documented
            showDomainOnlyForAutolink: false,
            // TODO: need to be documented
            hintMode: 'word',
            hintSelect: 'after',
            hintDirection: 'bottom',
            styleTags: ['p', 'blockquote', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
            fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Helvetica Neue', 'Helvetica', 'Impact', 'Lucida Grande', 'Tahoma', 'Times New Roman', 'Verdana'],
            fontNamesIgnoreCheck: [],
            addDefaultFonts: true,
            fontSizes: ['8', '9', '10', '11', '12', '14', '18', '24', '36'],
            fontSizeUnits: ['px', 'pt'],
            // pallete colors(n x n)
            colors: [['#000000', '#424242', '#636363', '#9C9C94', '#CEC6CE', '#EFEFEF', '#F7F7F7', '#FFFFFF'], ['#FF0000', '#FF9C00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#9C00FF', '#FF00FF'], ['#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE'], ['#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD'], ['#E76363', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5'], ['#CE0000', '#E79439', '#EFC631', '#6BA54A', '#4A7B8C', '#3984C6', '#634AA5', '#A54A7B'], ['#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842'], ['#630000', '#7B3900', '#846300', '#295218', '#083139', '#003163', '#21104A', '#4A1031']],
            // http://chir.ag/projects/name-that-color/
            colorsName: [['Black', 'Tundora', 'Dove Gray', 'Star Dust', 'Pale Slate', 'Gallery', 'Alabaster', 'White'], ['Red', 'Orange Peel', 'Yellow', 'Green', 'Cyan', 'Blue', 'Electric Violet', 'Magenta'], ['Azalea', 'Karry', 'Egg White', 'Zanah', 'Botticelli', 'Tropical Blue', 'Mischka', 'Twilight'], ['Tonys Pink', 'Peach Orange', 'Cream Brulee', 'Sprout', 'Casper', 'Perano', 'Cold Purple', 'Careys Pink'], ['Mandy', 'Rajah', 'Dandelion', 'Olivine', 'Gulf Stream', 'Viking', 'Blue Marguerite', 'Puce'], ['Guardsman Red', 'Fire Bush', 'Golden Dream', 'Chelsea Cucumber', 'Smalt Blue', 'Boston Blue', 'Butterfly Bush', 'Cadillac'], ['Sangria', 'Mai Tai', 'Buddha Gold', 'Forest Green', 'Eden', 'Venice Blue', 'Meteorite', 'Claret'], ['Rosewood', 'Cinnamon', 'Olive', 'Parsley', 'Tiber', 'Midnight Blue', 'Valentino', 'Loulou']],
            colorButton: {
              foreColor: '#000000',
              backColor: '#FFFF00'
            },
            lineHeights: ['1.0', '1.2', '1.4', '1.5', '1.6', '1.8', '2.0', '3.0'],
            tableClassName: 'table table-bordered',
            insertTableMaxSize: {
              col: 10,
              row: 10
            },
            // By default, dialogs are attached in container.
            dialogsInBody: false,
            dialogsFade: false,
            maximumImageFileSize: null,
            callbacks: {
              onBeforeCommand: null,
              onBlur: null,
              onBlurCodeview: null,
              onChange: null,
              onChangeCodeview: null,
              onDialogShown: null,
              onEnter: null,
              onFocus: null,
              onImageLinkInsert: null,
              onImageUpload: null,
              onImageUploadError: null,
              onInit: null,
              onKeydown: null,
              onKeyup: null,
              onMousedown: null,
              onMouseup: null,
              onPaste: null,
              onScroll: null
            },
            codemirror: {
              mode: 'text/html',
              htmlMode: true,
              lineNumbers: true
            },
            codeviewFilter: false,
            codeviewFilterRegex: /<\/*(?:applet|b(?:ase|gsound|link)|embed|frame(?:set)?|ilayer|l(?:ayer|ink)|meta|object|s(?:cript|tyle)|t(?:itle|extarea)|xml)[^>]*?>/gi,
            codeviewIframeFilter: true,
            codeviewIframeWhitelistSrc: [],
            codeviewIframeWhitelistSrcBase: ['www.youtube.com', 'www.youtube-nocookie.com', 'www.facebook.com', 'vine.co', 'instagram.com', 'player.vimeo.com', 'www.dailymotion.com', 'player.youku.com', 'v.qq.com'],
            keyMap: {
              pc: {
                'ESC': 'escape',
                'ENTER': 'insertParagraph',
                'CTRL+Z': 'undo',
                'CTRL+Y': 'redo',
                'TAB': 'tab',
                'SHIFT+TAB': 'untab',
                'CTRL+B': 'bold',
                'CTRL+I': 'italic',
                'CTRL+U': 'underline',
                'CTRL+SHIFT+S': 'strikethrough',
                'CTRL+BACKSLASH': 'removeFormat',
                'CTRL+SHIFT+L': 'justifyLeft',
                'CTRL+SHIFT+E': 'justifyCenter',
                'CTRL+SHIFT+R': 'justifyRight',
                'CTRL+SHIFT+J': 'justifyFull',
                'CTRL+SHIFT+NUM7': 'insertUnorderedList',
                'CTRL+SHIFT+NUM8': 'insertOrderedList',
                'CTRL+LEFTBRACKET': 'outdent',
                'CTRL+RIGHTBRACKET': 'indent',
                'CTRL+NUM0': 'formatPara',
                'CTRL+NUM1': 'formatH1',
                'CTRL+NUM2': 'formatH2',
                'CTRL+NUM3': 'formatH3',
                'CTRL+NUM4': 'formatH4',
                'CTRL+NUM5': 'formatH5',
                'CTRL+NUM6': 'formatH6',
                'CTRL+ENTER': 'insertHorizontalRule',
                'CTRL+K': 'linkDialog.show'
              },
              mac: {
                'ESC': 'escape',
                'ENTER': 'insertParagraph',
                'CMD+Z': 'undo',
                'CMD+SHIFT+Z': 'redo',
                'TAB': 'tab',
                'SHIFT+TAB': 'untab',
                'CMD+B': 'bold',
                'CMD+I': 'italic',
                'CMD+U': 'underline',
                'CMD+SHIFT+S': 'strikethrough',
                'CMD+BACKSLASH': 'removeFormat',
                'CMD+SHIFT+L': 'justifyLeft',
                'CMD+SHIFT+E': 'justifyCenter',
                'CMD+SHIFT+R': 'justifyRight',
                'CMD+SHIFT+J': 'justifyFull',
                'CMD+SHIFT+NUM7': 'insertUnorderedList',
                'CMD+SHIFT+NUM8': 'insertOrderedList',
                'CMD+LEFTBRACKET': 'outdent',
                'CMD+RIGHTBRACKET': 'indent',
                'CMD+NUM0': 'formatPara',
                'CMD+NUM1': 'formatH1',
                'CMD+NUM2': 'formatH2',
                'CMD+NUM3': 'formatH3',
                'CMD+NUM4': 'formatH4',
                'CMD+NUM5': 'formatH5',
                'CMD+NUM6': 'formatH6',
                'CMD+ENTER': 'insertHorizontalRule',
                'CMD+K': 'linkDialog.show'
              }
            },
            icons: {
              'align': 'note-icon-align',
              'alignCenter': 'note-icon-align-center',
              'alignJustify': 'note-icon-align-justify',
              'alignLeft': 'note-icon-align-left',
              'alignRight': 'note-icon-align-right',
              'rowBelow': 'note-icon-row-below',
              'colBefore': 'note-icon-col-before',
              'colAfter': 'note-icon-col-after',
              'rowAbove': 'note-icon-row-above',
              'rowRemove': 'note-icon-row-remove',
              'colRemove': 'note-icon-col-remove',
              'indent': 'note-icon-align-indent',
              'outdent': 'note-icon-align-outdent',
              'arrowsAlt': 'note-icon-arrows-alt',
              'bold': 'note-icon-bold',
              'caret': 'note-icon-caret',
              'circle': 'note-icon-circle',
              'close': 'note-icon-close',
              'code': 'note-icon-code',
              'eraser': 'note-icon-eraser',
              'floatLeft': 'note-icon-float-left',
              'floatRight': 'note-icon-float-right',
              'font': 'note-icon-font',
              'frame': 'note-icon-frame',
              'italic': 'note-icon-italic',
              'link': 'note-icon-link',
              'unlink': 'note-icon-chain-broken',
              'magic': 'note-icon-magic',
              'menuCheck': 'note-icon-menu-check',
              'minus': 'note-icon-minus',
              'orderedlist': 'note-icon-orderedlist',
              'pencil': 'note-icon-pencil',
              'picture': 'note-icon-picture',
              'question': 'note-icon-question',
              'redo': 'note-icon-redo',
              'rollback': 'note-icon-rollback',
              'square': 'note-icon-square',
              'strikethrough': 'note-icon-strikethrough',
              'subscript': 'note-icon-subscript',
              'superscript': 'note-icon-superscript',
              'table': 'note-icon-table',
              'textHeight': 'note-icon-text-height',
              'trash': 'note-icon-trash',
              'underline': 'note-icon-underline',
              'undo': 'note-icon-undo',
              'unorderedlist': 'note-icon-unorderedlist',
              'video': 'note-icon-video'
            }
          }
        });
        /***/
      },

      /***/
      4:
      /***/
      function _(module, exports, __webpack_require__) {// extracted by mini-css-extract-plugin

        /***/
      },

      /***/
      52:
      /***/
      function _(module, __webpack_exports__, __webpack_require__) {
        "use strict"; // ESM COMPAT FLAG

        __webpack_require__.r(__webpack_exports__); // EXTERNAL MODULE: external {"root":"jQuery","commonjs2":"jquery","commonjs":"jquery","amd":"jquery"}


        var external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_ = __webpack_require__(0);

        var external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default = /*#__PURE__*/__webpack_require__.n(external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_); // EXTERNAL MODULE: ./src/js/base/renderer.js


        var renderer = __webpack_require__(1); // CONCATENATED MODULE: ./src/js/bs3/ui.js


        function _typeof(obj) {
          "@babel/helpers - typeof";

          if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
            _typeof = function _typeof(obj) {
              return typeof obj;
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
          }

          return _typeof(obj);
        }

        var editor = renderer["a"
        /* default */
        ].create('<div class="note-editor note-frame panel panel-default"/>');
        var toolbar = renderer["a"
        /* default */
        ].create('<div class="panel-heading note-toolbar" role="toolbar"/>');
        var editingArea = renderer["a"
        /* default */
        ].create('<div class="note-editing-area"/>');
        var codable = renderer["a"
        /* default */
        ].create('<textarea class="note-codable" aria-multiline="true"/>');
        var editable = renderer["a"
        /* default */
        ].create('<div class="note-editable" contentEditable="true" role="textbox" aria-multiline="true"/>');
        var statusbar = renderer["a"
        /* default */
        ].create(['<output class="note-status-output" role="status" aria-live="polite"></output>', '<div class="note-statusbar" role="status">', '<div class="note-resizebar" aria-label="Resize">', '<div class="note-icon-bar"></div>', '<div class="note-icon-bar"></div>', '<div class="note-icon-bar"></div>', '</div>', '</div>'].join(''));
        var airEditor = renderer["a"
        /* default */
        ].create('<div class="note-editor note-airframe"/>');
        var airEditable = renderer["a"
        /* default */
        ].create(['<div class="note-editable" contentEditable="true" role="textbox" aria-multiline="true"></div>', '<output class="note-status-output" role="status" aria-live="polite"></output>'].join(''));
        var buttonGroup = renderer["a"
        /* default */
        ].create('<div class="note-btn-group btn-group">');
        var dropdown = renderer["a"
        /* default */
        ].create('<ul class="note-dropdown-menu dropdown-menu">', function ($node, options) {
          var markup = Array.isArray(options.items) ? options.items.map(function (item) {
            var value = typeof item === 'string' ? item : item.value || '';
            var content = options.template ? options.template(item) : item;
            var option = _typeof(item) === 'object' ? item.option : undefined;
            var dataValue = 'data-value="' + value + '"';
            var dataOption = option !== undefined ? ' data-option="' + option + '"' : '';
            return '<li aria-label="' + value + '"><a href="#" ' + (dataValue + dataOption) + '>' + content + '</a></li>';
          }).join('') : options.items;
          $node.html(markup).attr({
            'aria-label': options.title
          });

          if (options && options.codeviewKeepButton) {
            $node.addClass('note-codeview-keep');
          }
        });

        var dropdownButtonContents = function dropdownButtonContents(contents, options) {
          return contents + ' ' + icon(options.icons.caret, 'span');
        };

        var dropdownCheck = renderer["a"
        /* default */
        ].create('<ul class="note-dropdown-menu dropdown-menu note-check">', function ($node, options) {
          var markup = Array.isArray(options.items) ? options.items.map(function (item) {
            var value = typeof item === 'string' ? item : item.value || '';
            var content = options.template ? options.template(item) : item;
            return '<li aria-label="' + item + '"><a href="#" data-value="' + value + '">' + icon(options.checkClassName) + ' ' + content + '</a></li>';
          }).join('') : options.items;
          $node.html(markup).attr({
            'aria-label': options.title
          });

          if (options && options.codeviewKeepButton) {
            $node.addClass('note-codeview-keep');
          }
        });
        var dialog = renderer["a"
        /* default */
        ].create('<div class="modal note-modal" aria-hidden="false" tabindex="-1" role="dialog"/>', function ($node, options) {
          if (options.fade) {
            $node.addClass('fade');
          }

          $node.attr({
            'aria-label': options.title
          });
          $node.html(['<div class="modal-dialog">', '<div class="modal-content">', options.title ? '<div class="modal-header">' + '<button type="button" class="close" data-dismiss="modal" aria-label="Close" aria-hidden="true">&times;</button>' + '<h4 class="modal-title">' + options.title + '</h4>' + '</div>' : '', '<div class="modal-body">' + options.body + '</div>', options.footer ? '<div class="modal-footer">' + options.footer + '</div>' : '', '</div>', '</div>'].join(''));
        });
        var popover = renderer["a"
        /* default */
        ].create(['<div class="note-popover popover in">', '<div class="arrow"></div>', '<div class="popover-content note-children-container"></div>', '</div>'].join(''), function ($node, options) {
          var direction = typeof options.direction !== 'undefined' ? options.direction : 'bottom';
          $node.addClass(direction);

          if (options.hideArrow) {
            $node.find('.arrow').hide();
          }
        });
        var ui_checkbox = renderer["a"
        /* default */
        ].create('<div class="checkbox"></div>', function ($node, options) {
          $node.html(['<label' + (options.id ? ' for="note-' + options.id + '"' : '') + '>', '<input type="checkbox"' + (options.id ? ' id="note-' + options.id + '"' : ''), options.checked ? ' checked' : '', ' aria-checked="' + (options.checked ? 'true' : 'false') + '"/>', options.text ? options.text : '', '</label>'].join(''));
        });

        var icon = function icon(iconClassName, tagName) {
          tagName = tagName || 'i';
          return '<' + tagName + ' class="' + iconClassName + '"></' + tagName + '>';
        };

        var ui_ui = function ui(editorOptions) {
          return {
            editor: editor,
            toolbar: toolbar,
            editingArea: editingArea,
            codable: codable,
            editable: editable,
            statusbar: statusbar,
            airEditor: airEditor,
            airEditable: airEditable,
            buttonGroup: buttonGroup,
            dropdown: dropdown,
            dropdownButtonContents: dropdownButtonContents,
            dropdownCheck: dropdownCheck,
            dialog: dialog,
            popover: popover,
            checkbox: ui_checkbox,
            icon: icon,
            options: editorOptions,
            palette: function palette($node, options) {
              return renderer["a"
              /* default */
              ].create('<div class="note-color-palette"/>', function ($node, options) {
                var contents = [];

                for (var row = 0, rowSize = options.colors.length; row < rowSize; row++) {
                  var eventName = options.eventName;
                  var colors = options.colors[row];
                  var colorsName = options.colorsName[row];
                  var buttons = [];

                  for (var col = 0, colSize = colors.length; col < colSize; col++) {
                    var color = colors[col];
                    var colorName = colorsName[col];
                    buttons.push(['<button type="button" class="note-color-btn"', 'style="background-color:', color, '" ', 'data-event="', eventName, '" ', 'data-value="', color, '" ', 'title="', colorName, '" ', 'aria-label="', colorName, '" ', 'data-toggle="button" tabindex="-1"></button>'].join(''));
                  }

                  contents.push('<div class="note-color-row">' + buttons.join('') + '</div>');
                }

                $node.html(contents.join(''));

                if (options.tooltip) {
                  $node.find('.note-color-btn').tooltip({
                    container: options.container || editorOptions.container,
                    trigger: 'hover',
                    placement: 'bottom'
                  });
                }
              })($node, options);
            },
            button: function button($node, options) {
              return renderer["a"
              /* default */
              ].create('<button type="button" class="note-btn btn btn-default btn-sm" tabindex="-1">', function ($node, options) {
                if (options && options.tooltip) {
                  $node.attr({
                    title: options.tooltip,
                    'aria-label': options.tooltip
                  }).tooltip({
                    container: options.container || editorOptions.container,
                    trigger: 'hover',
                    placement: 'bottom'
                  }).on('click', function (e) {
                    external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(e.currentTarget).tooltip('hide');
                  });
                }

                if (options && options.codeviewButton) {
                  $node.addClass('note-codeview-keep');
                }
              })($node, options);
            },
            toggleBtn: function toggleBtn($btn, isEnable) {
              $btn.toggleClass('disabled', !isEnable);
              $btn.attr('disabled', !isEnable);
            },
            toggleBtnActive: function toggleBtnActive($btn, isActive) {
              $btn.toggleClass('active', isActive);
            },
            onDialogShown: function onDialogShown($dialog, handler) {
              $dialog.one('shown.bs.modal', handler);
            },
            onDialogHidden: function onDialogHidden($dialog, handler) {
              $dialog.one('hidden.bs.modal', handler);
            },
            showDialog: function showDialog($dialog) {
              $dialog.modal('show');
            },
            hideDialog: function hideDialog($dialog) {
              $dialog.modal('hide');
            },
            createLayout: function createLayout($note) {
              var $editor = (editorOptions.airMode ? airEditor([editingArea([codable(), airEditable()])]) : editorOptions.toolbarPosition === 'bottom' ? editor([editingArea([codable(), editable()]), toolbar(), statusbar()]) : editor([toolbar(), editingArea([codable(), editable()]), statusbar()])).render();
              $editor.insertAfter($note);
              return {
                note: $note,
                editor: $editor,
                toolbar: $editor.find('.note-toolbar'),
                editingArea: $editor.find('.note-editing-area'),
                editable: $editor.find('.note-editable'),
                codable: $editor.find('.note-codable'),
                statusbar: $editor.find('.note-statusbar')
              };
            },
            removeLayout: function removeLayout($note, layoutInfo) {
              $note.html(layoutInfo.editable.html());
              layoutInfo.editor.remove();
              $note.show();
            }
          };
        };
        /* harmony default export */


        var bs3_ui = ui_ui; // EXTERNAL MODULE: ./src/js/base/settings.js + 37 modules

        var settings = __webpack_require__(3); // EXTERNAL MODULE: ./src/styles/summernote-bs3.scss


        var summernote_bs3 = __webpack_require__(4); // CONCATENATED MODULE: ./src/js/bs3/settings.js


        external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.summernote = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.extend(external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.summernote, {
          ui_template: bs3_ui,
          "interface": 'bs3'
        });
        /***/
      }
      /******/

    })
  );
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"), __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ 1:
/*!*****************************************!*\
  !*** multi ./resources/js/dashboard.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\programming\laravel_projects\vbes\resources\js\dashboard.js */"./resources/js/dashboard.js");


/***/ })

},[[1,"/js/manifest","/js/vendor"]]]);