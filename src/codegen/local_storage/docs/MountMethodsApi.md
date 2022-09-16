# AMD.MountMethodsApi

All URIs are relative to *https://gitee.com/v2/local_storage*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getMounts**](MountMethodsApi.md#getMounts) | **GET** /mount | Get all mounted volumes
[**mount**](MountMethodsApi.md#mount) | **POST** /mount | Mount a volume
[**umount**](MountMethodsApi.md#umount) | **DELETE** /mount | Umount volume
[**updateMount**](MountMethodsApi.md#updateMount) | **PUT** /mount | Update a mount volume



## getMounts

> GetMounts200Response getMounts(opts)

Get all mounted volumes

Get all volumes currently mounted on the system. Volumes can be filtered by corresponding query parameters.

### Example

```javascript
import AMD from 'casa_os_local_storage_api';

let apiInstance = new AMD.MountMethodsApi();
let opts = {
  'id': 0, // String | Filter the results by id
  'mountPoint': /, // String | Filter the results by mount point
  'type': ext4, // String | Filter the results by type
  'source': /dev/sda1 // String | Filter the results by source
};
apiInstance.getMounts(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| Filter the results by id | [optional] 
 **mountPoint** | **String**| Filter the results by mount point | [optional] 
 **type** | **String**| Filter the results by type | [optional] 
 **source** | **String**| Filter the results by source | [optional] 

### Return type

[**GetMounts200Response**](GetMounts200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## mount

> UpdateMount200Response mount(opts)

Mount a volume

(TODO)

### Example

```javascript
import AMD from 'casa_os_local_storage_api';

let apiInstance = new AMD.MountMethodsApi();
let opts = {
  'mount': new AMD.Mount() // Mount | 
};
apiInstance.mount(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **mount** | [**Mount**](Mount.md)|  | [optional] 

### Return type

[**UpdateMount200Response**](UpdateMount200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## umount

> BaseResponse umount(mountPoint, opts)

Umount volume

(TODO)

### Example

```javascript
import AMD from 'casa_os_local_storage_api';

let apiInstance = new AMD.MountMethodsApi();
let mountPoint = /DATA; // String | Filter the results by mount point
let opts = {
  'persist': true // Boolean | `true` if the mount should be removed from `/etc/fstab`, `false` otherwise
};
apiInstance.umount(mountPoint, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **mountPoint** | **String**| Filter the results by mount point | 
 **persist** | **Boolean**| &#x60;true&#x60; if the mount should be removed from &#x60;/etc/fstab&#x60;, &#x60;false&#x60; otherwise | [optional] [default to true]

### Return type

[**BaseResponse**](BaseResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateMount

> UpdateMount200Response updateMount(mountPoint, opts)

Update a mount volume

Updating a mount volume is equivalent to unmounting the volume and mounting it again with the new parameters.

### Example

```javascript
import AMD from 'casa_os_local_storage_api';

let apiInstance = new AMD.MountMethodsApi();
let mountPoint = /; // String | Filter the results by mount point
let opts = {
  'mount': new AMD.Mount() // Mount | 
};
apiInstance.updateMount(mountPoint, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **mountPoint** | **String**| Filter the results by mount point | 
 **mount** | [**Mount**](Mount.md)|  | [optional] 

### Return type

[**UpdateMount200Response**](UpdateMount200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

