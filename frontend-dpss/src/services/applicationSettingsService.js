import api from "./api";

const STATUS_URL = "/settings/application-status";

const applicationSettingsService = {
  getStatus: (config) => api.get(STATUS_URL, config),
  updateStatus: (open) => api.put(STATUS_URL, { open }),
};

export default applicationSettingsService;
