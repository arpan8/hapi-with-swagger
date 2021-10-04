const Joi = require('joi');
const Test = require('../../controllers/Test');

const router = [
    {
        path:'/add',
		method:'POST',
		options:{
			handler: Test.addDetails,
            description:"Add some details",
        	notes:'Add and see the result',
            tags:['api'],
            validate: {
                payload: Joi.object({
                    name:  Joi.string().required(),
                    email:  Joi.string().email().required(),
                    password: Joi.string().required()
                })
            },
		}
    },{
        path: '/show-all-details',
        method: 'GET',
        options: {
            handler: Test.showDetails,
            description:"Show all details",
        	notes:'Show details',
            tags:['api'],
        }
    },{
        path: '/view/{id}',
        method: 'GET',
        options: {
            handler: Test.viewDetails,
            description:"View all details",
        	notes:'View',
            tags:['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().required()
                })
            }
        }
    },{
        path:'/update',
		method:'POST',
		options:{
			handler: Test.update,
            description:"Add some details",
        	notes:'Add and see the result',
            tags:['api'],
            validate: {
                payload: Joi.object({
                    id: Joi.number().required(),
                    name:  Joi.string().required(),
                    email:  Joi.string().email().required()
                })
            },
		}
    },{
        path:'/file-upload',
		method:'post',
		options:{
			payload: {
                output: 'file',
                multipart: true
            },
			handler: Test.fileUpload,
            description:"File upload",
        	notes:'file-upload',
        	tags:['api'],
			plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                payload: Joi.object({
                    file: Joi.any()
                        .meta({ swaggerType: 'file' })
                        .description('file')
                })
            },
		}
    }
]

module.exports = router;