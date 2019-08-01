import { AxiosStatic } from 'axios'
import { SerializyInstance } from 'http-helpers-serializy'

// TODO: added typings for 'model' property

export interface AxiosSerializy extends AxiosStatic {
    setErrorModel(errorModel: SerializyInstance): void;
}
  
declare const Axios: AxiosSerializy;

export default Axios;