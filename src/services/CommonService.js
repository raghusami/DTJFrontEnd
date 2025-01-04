import http from "./http-common";

// JavaScript does not have types, so these are removed
// const Param = ["id", "scheduleDate", "dateTime", "ScheduleDate", "startDate", "statusEnumname", "fileType", "endDate", "notificationId", "countryId", "stateId", "roleId", "currentDate"];
// const ContentType = ["application/json-patch+json", "application/json", "multipart/form-data", "blob"];
// const responseType = ["blob", "arraybuffer"];

class CommonService {
    get(ControllerName, ModelName, ContentType, responseType) {
        return http.get(`/${ControllerName}/${ModelName}`, {
            headers: { 'Content-Type': `${ContentType}`, 'responseType': `${responseType}` }
        }).catch((err) => {
            throw err?.message;
        });
    }

    getWithQueryParam(ControllerName, ModelName, Param, value) {
        return http.get(`/${ControllerName}/${ModelName}?${Param}=${value}`).catch((err) => {
            throw err?.message;
        });
    }

    getWithSingleParam(ControllerName, ModelName, value) {
        return http.get(`/${ControllerName}/${ModelName}?id=${value}`).catch((err) => {
            throw err?.message;
        });
    }

    getWithDoubleParam(ControllerName, ModelName, Param, value1, Param2, value2) {
        return http.get(`/${ControllerName}/${ModelName}?${Param}=${value1}&${Param2}=${value2}`).catch((err) => {
            throw err?.message;
        });
    }

    getWithTripleParam(ControllerName, ModelName, Param, value, Param2, value2, Param3, value3) {
        return http.get(`/${ControllerName}/${ModelName}?${Param}=${value}&${Param2}=${value2}&${Param3}=${value3}`).catch((err) => {
            throw err?.message;
        });
    }

    post(ControllerName, ModelName, data) {
        return http.post(`/${ControllerName}/${ModelName}`, data).catch((err) => {
            throw err?.message;
        });
    }

    postWithSingleParam(ControllerName, ModelName, value1) {
        return http.post(`/${ControllerName}/${ModelName}/${value1}`).catch((err) => {
            throw err?.message;
        });
    }

    postWithQueryParam(ControllerName, ModelName, Param, value, contentType) {
        return http.post(`/${ControllerName}/${ModelName}?${Param}=${value}`, {
            headers: { 'Content-Type': `${contentType}` }
        }).catch((err) => {
            throw err?.message;
        });
    }

    postWithDoubleParam(ControllerName, ModelName, Param, value1, Param2, value2) {
        return http.post(`/${ControllerName}/${ModelName}?${Param}=${value1}&${Param2}=${value2}`).catch((err) => {
            throw err?.message;
        });
    }

    postWithFormData(ControllerName, ModelName, data) {
        return http.post(`/${ControllerName}/${ModelName}`, data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).catch((err) => {
            throw err?.message;
        });
    }

    postWithFormDataWithQueryParam(ControllerName, ModelName, data, Param, value, contentType) {
        return http.post(`/${ControllerName}/${ModelName}?${Param}=${value}`, data, {
            headers: { 'Content-Type': `${contentType}` }
        }).catch((err) => {
            throw err?.message;
        });
    }

    postWithFormDataWithDoubleQueryParam(ControllerName, ModelName, Param1, Param2, value1, value2) {
        return http.post(`/${ControllerName}/${ModelName}?${Param1}=${value1}&${Param2}=${value2}`, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).catch((err) => {
            throw err?.message;
        });
    }

    postWithToken(ControllerName, ModelName, data, token) {
        return http.post(`/${ControllerName}/${ModelName}`, data, {
            headers: {
                "XSRF-TOKEN": token,
            }
        }).catch((err) => {
            throw err?.message;
        });
    }

    deleteWithQueryParam(ControllerName, ModelName, Param, value) {
        return http.delete(`/${ControllerName}/${ModelName}?${Param}=${value}`).catch((err) => {
            throw err?.message;
        });
    }
}

export default new CommonService();
