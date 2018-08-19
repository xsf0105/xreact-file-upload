# xreact-file-upload
[中文版本](./README-ZH.md)

## Getting Started
```
npm install xreact-file-upload
```

```
import FileUpload from "xreact-file-upload";

<FileUpload
    node="导入"
    maxSize={5}
    request={{
        url:"/api/fileUpload",
        method: "POST",
        fields: {
            salaryGroupId,
            calBizId,
            calVersion,
            bizGroup:
                "floating_data"
        },
        headers: {
            <!-- "X-CSRF-TOKEN": cookie.get("_X_CSRF_TOKEN") -->
        }
    }}
    uploadSuccess={() => {
        ...
    }}
    uploadError={() => {
        ...
    }}
/>
```


## License

MIT
