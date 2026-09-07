import api from "./api";

const STATUS_URL = "/settings/application-status";

const applicationSettingsService = {
  getStatus: () => api.get(STATUS_URL),
  updateStatus: (open) => api.put(STATUS_URL, { open }),
};

export default applicationSettingsService;
