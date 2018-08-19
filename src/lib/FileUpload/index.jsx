import React, { Component } from "react";
import PropTypes from "prop-types";
import { Toast } from "antd-mobile";

import "./index.css";

class FileUpload extends Component {
    // constructor(props) {
    //     super(props);
    // }

    uploadComplete = event => {
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
                    uploadSuccess();
                } else {
                    uploadError();
                }
            } else {
                console.log("服务器返回值非标准JSON格式,无法处理,请联系管理员");
            }
        } else {
            if (xhr.statusText.indexOf("404")) {
                Toast.info("只能选择一个文件", 200);
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

    /**
     *  verify file
     */
    check = e => {
        const { multiple = false, maxSize = 5 } = this.props;
        const files = e.target.files;
        let { size } = files;
        if (!multiple) {
            size = files[0].size;
            if (files[0]) {
                if (e.target.files.length !== 1) {
                    Toast.info("只能选择一个文件", 200);
                    return;
                }
            }
        }
        if (size > maxSize * 1024 * 1024) {
            Toast.info("文件大小不能超过" + maxSize + "MB", 200);
        } else {
            this.send(files);
        }
        // console.log(e.target.files,9)   
        e.target.files = [];
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

    render() {
        const { node } = this.props;
        return (
            <div className="upload">
                {node}
                <input type="file" multiple name="file" onChange={e => this.check(e)} />
            </div>
        );
    }
}

FileUpload.propTypes = {
    node: PropTypes.element||PropTypes.string,
    maxSize: PropTypes.number,
    multiple: PropTypes.bool
};
export default FileUpload;
