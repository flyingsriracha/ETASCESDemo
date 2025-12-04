import axios, { AxiosRequestConfig as AxiosRequestConfigOriginal, AxiosHeaders, AxiosProgressEvent, AxiosProxyConfig, CancelToken, ResponseType, InternalAxiosRequestConfig, TransitionalOptions, FormSerializerOptions, AxiosRequestConfig, AxiosResponse } from 'axios';


// Define the BASE_URL variable without initializing it
let BASE_URL: string;
let apiClient: ReturnType<typeof axios.create>; // Type for the Axios instance

/**
 * Custom request configuration interface to decouple from AxiosRequestConfig.
 * This allows us to change the HTTP request framework in the future without affecting users.
 */
export interface CuiApiRequestConfig<D = any> extends Omit<AxiosRequestConfigOriginal<D>, 'baseURL' | 'headers' | 'params'> {
  /**
   * Optional base URL override for the request.
   */
  baseUrlOverride?: string;

  /**
   * Custom headers to include in the request.
   * Allows us to define headers in a more flexible manner without using Axios-specific `AxiosHeaders`.
   */
  headers?: Record<string, string> | AxiosHeaders;

  /**
   * Custom query parameters to include in the request.
   */
  params?: Record<string, any> | URLSearchParams;

  /**
   * Custom data to be sent in the request body (e.g., for POST, PUT requests).
   */
  data?: D;

  /**
   * Timeout value for the request in milliseconds.
   */
  timeout?: number;

  /**
   * Response type expected from the API (default: 'json').
   */
  responseType?: ResponseType;

  /**
   * Indicates whether the request should include credentials like cookies.
   */
  withCredentials?: boolean;

  /**
   * A function to be executed during the upload progress.
   */
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;

  /**
   * A function to be executed during the download progress.
   */
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;

  /**
   * Maximum content length to allow in the response.
   */
  maxContentLength?: number;

  /**
   * A function to validate the status code returned by the API.
   */
  validateStatus?: ((status: number) => boolean) | null;

  /**
   * Custom proxy configuration (e.g., for requests going through a proxy server).
   */
  proxy?: AxiosProxyConfig | false;

  /**
   * Optional cancel token to cancel a request.
   */
  cancelToken?: CancelToken;

  /**
   * Controls the use of compression during the request/response cycle.
   */
  decompress?: boolean;

  /**
   * Special transitional options that help control breaking changes for Axios updates.
   */
  transitional?: TransitionalOptions;

  /**
   * Custom fetch options for the request.
   */
  fetchOptions?: Record<string, any>;

  /**
   * Optional XSRF token configuration.
   */
  withXSRFToken?: boolean | ((config: InternalAxiosRequestConfig) => boolean | undefined);

  /**
   * Custom form serializer configuration if required.
   */
  formSerializer?: FormSerializerOptions;

  /**
   * Custom socket path configuration.
   */
  socketPath?: string | null;

  /**
   * Define the transport type for the request.
   */
  transport?: any;
}


/**
 * Utility function to map CuiApiRequestConfig to AxiosRequestConfig.
 * This ensures compatibility with Axios while allowing custom properties.
 *
 * @param {CuiApiRequestConfig} config - Custom API request configuration.
 * @returns {AxiosRequestConfig} Axios-compatible configuration object.
 */
const mapToAxiosConfig = (config: CuiApiRequestConfig): AxiosRequestConfig => {
  const { baseUrlOverride, ...rest } = config; // Extract custom properties
  return {
    ...rest,
    baseURL: baseUrlOverride || BASE_URL, // Use override if provided
  };
};

/**
 * Sets a new base URL for the Axios client.
 *
 * @param {string} newBaseUrl - The new base URL to be set.
 */
const setBaseUrl = (newBaseUrl: string): void => {
  BASE_URL = newBaseUrl;
  if (apiClient) {
    apiClient.defaults.baseURL = BASE_URL;
  }
};

/**
 * Initialize the Axios instance with default settings.
 */
const initializeAxios = (): void => {
  apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      // You can add other headers like authorization tokens here
    },
  });
};

/**
 * Sends a POST request to create a resource.
 *
 * @template T
 * @param {string} url - The URL to send the request to.
 * @param {any} [data={}] - The data to be sent in the request body.
 * @param {CuiApiRequestConfig} [config={}] - The custom API request configuration.
 * @returns {Promise<AxiosResponse<T>>} The Axios response.
 */
const create = async <T>(url: string, data: any = {}, config: CuiApiRequestConfig = {}): Promise<AxiosResponse<T>> => {
  const axiosConfig = mapToAxiosConfig(config);
  return apiClient.post<T>(url, data, axiosConfig);
};

/**
 * Sends a GET request to read a resource.
 *
 * @template T
 * @param {string} url - The URL to send the request to.
 * @param {CuiApiRequestConfig} [config={}] - The custom API request configuration.
 * @returns {Promise<AxiosResponse<T>>} The Axios response.
 */
const read = async <T>(url: string, config: CuiApiRequestConfig = {}): Promise<AxiosResponse<T>> => {
  const axiosConfig = mapToAxiosConfig(config);
  return apiClient.get<T>(url, axiosConfig);
};

/**
 * Sends a PUT request to update a resource.
 *
 * @template T
 * @param {string} url - The URL to send the request to.
 * @param {any} [data={}] - The data to be sent in the request body.
 * @param {CuiApiRequestConfig} [config={}] - The custom API request configuration.
 * @returns {Promise<AxiosResponse<T>>} The Axios response.
 */
const update = async <T>(url: string, data: any = {}, config: CuiApiRequestConfig = {}): Promise<AxiosResponse<T>> => {
  const axiosConfig = mapToAxiosConfig(config);
  return apiClient.put<T>(url, data, axiosConfig);
};

/**
 * Sends a DELETE request to remove a resource.
 *
 * @template T
 * @param {string} url - The URL to send the request to.
 * @param {CuiApiRequestConfig} [config={}] - The custom API request configuration.
 * @returns {Promise<AxiosResponse<T>>} The Axios response.
 */
const remove = async <T>(url: string, config: CuiApiRequestConfig = {}): Promise<AxiosResponse<T>> => {
  const axiosConfig = mapToAxiosConfig(config);
  return apiClient.delete<T>(url, axiosConfig);
};

// Initialize the Axios instance
initializeAxios();

// Export the function to set the base URL and the API methods
export { setBaseUrl, create, read, update, remove };
