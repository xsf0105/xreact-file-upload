var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import PropTypes from "prop-types";

import "./index.css";

var FileUpload = function (_Component) {
    _inherits(FileUpload, _Component);

    function FileUpload() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, FileUpload);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FileUpload.__proto__ || Object.getPrototypeOf(FileUpload)).call.apply(_ref, [this].concat(args))), _this), _this.uploadComplete = function (event) {
            console.log(event);

            var _ref2 = _this.props || {},
                uploadSuccess = _ref2.uploadSuccess,
                uploadError = _ref2.uploadError;

            var xhr = event.target;
            if (xhr.readyState === 4 && xhr.status === 200) {
                var result = JSON.parse(xhr.responseText);
                if (result && result.success !== null && result.success !== undefined) {
                    if (result.success === true) {
                        if (!uploadSuccess) alert("导入成功");else uploadSuccess();
                    } else {
                        if (!uploadError) alert(result.errorMsg || "导入失败啦～");else uploadError();
                    }
                } else {
                    console.log("服务器返回值非标准JSON格式,无法处理,请联系管理员");
                }
            } else {
                if (xhr.statusText.indexOf("404")) {
                    console.log("服务器没有响应,请检查您的上传路径");
                } else {
                    console.log("服务器处理错误");
                }
            }
        }, _this.uploadProgress = function () {
            // console.log("uploadProgress to be continue...");
        }, _this.uploadFailed = function () {
            // console.log("uploadFailed to be continue...");
        }, _this.uploadCanceled = function () {
            // console.log("uploadCanceled to be continue...");
        }, _this.send = function (files) {
            var xhr = new XMLHttpRequest();

            var _ref3 = _this.props || {},
                request = _ref3.request;

            var url = request.url,
                method = request.method,
                fields = request.fields,
                headers = request.headers;


            var formData = new FormData();

            if (fields) {
                Object.keys(fields).forEach(function (field) {
                    return formData.append(field, fields[field]);
                });
            }
            Array.from(files).forEach(function (file) {
                return formData.append(request.fileName || "file", file);
            });

            xhr.upload.addEventListener("progress", _this.uploadProgress(), false);

            xhr.addEventListener("load", _this.uploadComplete, false);
            xhr.addEventListener("error", _this.uploadFailed(), false);
            xhr.addEventListener("abort", _this.uploadCanceled(), false);
            xhr.open(method, url, true);
            if (headers) {
                Object.keys(headers).forEach(function (header) {
                    return xhr.setRequestHeader(header, headers[header]);
                });
            }
            xhr.send(formData);
        }, _this.check = function (e) {
            var _this$props = _this.props,
                _this$props$multiple = _this$props.multiple,
                multiple = _this$props$multiple === undefined ? false : _this$props$multiple,
                _this$props$maxSize = _this$props.maxSize,
                maxSize = _this$props$maxSize === undefined ? 5 : _this$props$maxSize;

            var files = e.target.files;

            // alert({ message: 1 + JSON.stringify(e.target.files) });
            var size = files.size;

            if (!multiple) {
                size = files[0].size;
                if (files[0]) {
                    if (e.target.files.length !== 1) {
                        alert("只能选择一个文件", 2);
                        return;
                    }
                }
            }
            if (size > maxSize * 1024 * 1024) {
                alert("文件大小不能超过" + maxSize + "MB", 2);
            } else {
                _this.send(files);
            }

            // e.target.value = [];
            // console.log(e.target.files);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    //verify


    _createClass(FileUpload, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                customNode = _props.customNode,
                multiple = _props.multiple;

            return React.createElement(
                "div",
                { className: "upload" },
                customNode,
                React.createElement("input", {
                    multiple: multiple,
                    type: "file",
                    name: "file",
                    onChange: function onChange(e) {
                        _this2.check(e);
                    },
                    onClick: function onClick(e) {
                        e.stopPropagation();
                    }
                })
            );
        }
    }]);

    return FileUpload;
}(Component);

FileUpload.propTypes = {
    node: PropTypes.string || PropTypes.element,
    maxSize: PropTypes.number,
    multiple: PropTypes.bool
};
export default FileUpload;