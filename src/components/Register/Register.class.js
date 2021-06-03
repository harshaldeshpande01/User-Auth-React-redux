const DEFAULT_STATE = {
    loading: false,
    data: {},
    error: null
}
  
export default class Register {
    constructor (stateDetails = undefined, details = {}) {
      this.data = stateDetails || DEFAULT_STATE
      this.data.loading = details.loading !== undefined ? details.loading : this.data.loading
      this.data.data = details.data !== undefined ? { ...this.data.data, ...details.data } : this.data.data
      this.data.error = details.error !== undefined ? details.error : this.data.error
      this.getReduxState = this.getReduxState.bind(this)
    }
    
    getReduxState () {
        return { ...this.data }
    }
}