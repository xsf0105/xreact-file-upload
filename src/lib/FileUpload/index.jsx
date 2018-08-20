import React, { Component } from "react";
import PropTypes from "prop-types";

import "./index.css";

class FileUpload extends Component {
    uploadComplete = event => {
        console.log(event);
        const { uploadSuccess, uploadError } = this.props || {};
        var xhr = event.target;
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText);
            if (
                result &&
                result.success !== null &&
                result.success !== undefined
            ) {
                if (result.success === true) {
                    if (!uploadSuccess) alert("导入成功");
                    else uploadSuccess();
                } else {
                    if (!uploadError)
                        alert(result.errorMsg || "导入失败啦～");
                    else uploadError();
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
    };

    uploadProgress = () => {
        // console.log("uploadProgress to be continue...");
    };

    uploadFailed = () => {
        // console.log("uploadFailed to be continue...");
    };

    uploadCanceled = () => {
        // console.log("uploadCanceled to be continue...");
    };

    send = files => {
        const xhr = new XMLHttpRequest();
        const { request } = this.props || {};
        const { url, method, fields, headers } = request;

        const formData = new FormData();

        if (fields) {
            Object.keys(fields).forEach(field =>
                formData.append(field, fields[field])
            );
        }
        Array.from(files).forEach(file =>
            formData.append(request.fileName || "file", file)
        );

        xhr.upload.addEventListener("progress", this.uploadProgress(), false);

        xhr.addEventListener("load", this.uploadComplete, false);
        xhr.addEventListener("error", this.uploadFailed(), false);
        xhr.addEventListener("abort", this.uploadCanceled(), false);
        xhr.open(method, url, true);
        if (headers) {
            Object.keys(headers).forEach(header =>
                xhr.setRequestHeader(header, headers[header])
            );
        }
        xhr.send(formData);
    };

    //verify
    check = e => {
        const { multiple = false, maxSize = 5 } = this.props;
        const files = e.target.files;

        // alert({ message: 1 + JSON.stringify(e.target.files) });
        let { size } = files;
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
            this.send(files);
        }

        // e.target.value = [];
        // console.log(e.target.files);
    };

    render() {
        const { customNode, multiple } = this.props;
        return (
            <div className="upload">
                {customNode}
                <input
                    multiple={multiple}
                    type="file"
                    name="file"
                    onChange={e => {
                        this.check(e);
                    }}
                    onClick={e => {
                        e.stopPropagation();
                    }}
                />
            </div>
        );
    }
}

FileUpload.propTypes = {
    node: PropTypes.string || PropTypes.element,
    maxSize: PropTypes.number,
    multiple: PropTypes.bool
};
export default FileUpload;
