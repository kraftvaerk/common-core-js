#	storage

	* local
		* get: (id, def /* default value */)
    	* set: (id, value)
		* del: (id)

	* session
		* get: (id, def /* default value */)
    	* set: (id, value)
		* del: (id)

#	environment

	* env
	* mode
		* mock
		* local
		* development
		* staging
		* production

#	exception

	* InvalidResponseError 
    * InvalidArgumentError 
    * NotImplementedError

#	utility

	* stringify (object)
    * parseJSON (json)
    * clone (source, destination)
    * extend (source, destination)
    * replacePlaceholderParams (placeholder, values, regex, limit)
    * replaceObjectParams (model, values, regex)
    * replaceStringParams (string = '', object = {})
    * urlParams (url, keys = [])
    * parameterize (data = {}, prefix = '?', append = '&')
    * parameterizeUrl (data = {}, prefix = '?', append = '&', url = '', replace = false, encode = false)
    * formToObject (elements = [], exclusions = [''])