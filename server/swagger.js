module.exports = {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'SEND-IT API',
    description: 'SendIT is a courier service that helps users deliver parcels to different destinations. SendIT provides courier quotes based on weight categories.',
    contact: {
      name: 'Samuel Osuh',
      email: 'jsamchineme@gmail.com'
    }
  },
  host: 'sendit-app-doc.herokuapp.com',
  basePath: '/api/v1/',
  produces: ['application/json'],
  schemes: ['https'],
  paths: {
    '/auth/signup': {
      post: {
        tags: ['Auth'],
        summary: 'Create a new user account',
        description: 'Users need to create an account so that they can login and perform tasks related with creating and managing parcels',
        operationId: 'postSignup',
        consumes: [
          'application/x-www-form-urlencoded',
        ],
        parameters: [
          {
            name: 'firstname',
            in: 'formData',
            description: 'The firstname to be registered with the new account',
            required: false,
            type: 'string'
          },
          {
            name: 'lastname',
            in: 'formData',
            description: 'The lastname to be registered with the new account',
            required: false,
            type: 'string'
          },
          {
            name: 'othernames',
            in: 'formData',
            description: 'The lastname to be registered with the new account',
            required: false,
            type: 'string'
          },
          {
            name: 'email',
            in: 'formData',
            description: 'The email to be registered with the new account',
            required: true,
            type: 'string'
          },
          {
            name: 'username',
            in: 'formData',
            description: 'The username to be registered with the new account',
            required: true,
            type: 'string'
          },
          {
            name: 'password',
            in: 'formData',
            description: 'The password to be registered with the new account',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          201: {
            description: 'New user account created successfully',
            schema: {
              $ref: '#/definitions/User'
            }
          },
          409: {
            description: 'A record with either same email or username already exists'
          },
          500: {
            description: 'Server Error'
          }
        }
      }
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login a user and generate authentication token',
        description: 'Users need to login so that they can perform tasks related with creating and managing parcels',
        operationId: 'postLogin',
        consumes: [
          'application/x-www-form-urlencoded'
        ],
        parameters: [
          {
            name: 'email',
            in: 'formData',
            description: 'The email registered with an account',
            required: true,
            type: 'string'
          },
          {
            name: 'password',
            in: 'formData',
            description: 'The password registered with an account',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'User authenticated'
          },
          401: {
            description: 'Credentials not found or Invalid token provided'
          },
          500: {
            description: 'Server Error'
          }
        }
      }
    },
    '/parcels': {
      post: {
        tags: ['Parcels'],
        summary: 'Create new parcel delivery order',
        consumes: [
          'application/x-www-form-urlencoded'
        ],
        parameters: [
          {
            name: 'x-access-token',
            in: 'header',
            description: 'Authorization token',
            required: true,
            type: 'string'
          },
          {
            name: 'description',
            in: 'formData',
            description: 'The description of the parcel order',
            required: true,
            type: 'string'
          },
          {
            name: 'weight',
            in: 'formData',
            description: 'The approximate weight of the parcel item(s)',
            required: true,
            type: 'string'
          },
          {
            name: 'currentLocation',
            in: 'formData',
            summary: 'formData',
            description: 'The location of the parcel pickup',
            required: true,
            type: 'string'
          },
          {
            name: 'to',
            in: 'formData',
            description: 'The address to which the parcel should be delivered',
            required: true,
            type: 'string'
          },
          {
            name: 'from',
            in: 'formData',
            description: 'The address from which the parcel is sent',
            required: true,
            type: 'string'
          },
          {
            name: 'contactEmail',
            in: 'formData',
            description: 'The email of the contact receiving the parcel',
            required: true,
            type: 'string'
          },
          {
            name: 'contactPhone',
            in: 'formData',
            description: 'The phone number of the contact receiving the parcel',
            required: true,
            type: 'string'
          }
        ],
        description: 'Create a new parcel delivery order',
        responses: {
          201: {
            description: 'New parcel created',
            schema: {
              type: 'object',
              items: {
                $ref: '#/definitions/Parcel'
              }
            }
          },
          422: {
            description: 'Required fields not filled'
          },
          500: {
            description: 'Unexpected server error'
          }
        }
      },
      get: {
        tags: ['Parcels'],
        summary: 'Get all parcel delivery orders',
        description: 'This allows admins to access all parcels available. Authenticate user must be an admin',
        consumes: ['application/json'],
        parameters: [
          {
            name: 'x-access-token',
            in: 'header',
            description: 'The authorization token',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'A list of Parcels',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Parcel'
              }
            }
          },
          500: {
            description: 'Unexpected server error'
          }
        }
      }
    },
    '/users/{userId}/parcels': {
      get: {
        tags: ['Parcels'],
        summary: 'Get all parcel delivery orders for a specific user',
        description: 'This allows a user access to all parcels they have created',
        consumes: ['application/json'],
        parameters: [
          {
            name: 'x-access-token',
            in: 'header',
            description: 'The authorization token',
            required: true,
            type: 'string'
          },
          {
            name: 'userId',
            in: 'path',
            description: 'The ID of the owner user',
            required: true,
            type: 'number'
          }
        ],
        responses: {
          200: {
            description: 'A list of Parcels',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Parcel'
              }
            }
          },
          401: {
            description: 'Unauthorised'
          },
          500: {
            description: 'Unexpected server error'
          }
        }
      }
    },
    '/parcels/{parcelId}': {
      get: {
        tags: ['Parcels'],
        summary: 'Get a specific parcel order',
        consumes: ['application/json', 'application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'x-access-token',
            in: 'header',
            description: 'Authorization token',
            required: true,
            type: 'string'
          },
          {
            name: 'parcelId',
            in: 'path',
            description: 'Parcel ID',
            required: true,
            type: 'number'
          }
        ],
        responses: {
          200: {
            description: 'Parcel retrieved',
            schema: {
              type: 'object',
              items: {
                $ref: '#/definitions/Parcel'
              }
            }
          },
          401: {
            description: 'Unauthorised'
          },
          500: {
            description: 'Unexpected server error'
          }
        }
      }
    },
    '/parcels/{parcelId}/cancel': {
      put: {
        tags: ['Parcels'],
        summary: 'Cancel a parcel delivery order',
        consumes: ['application/json'],
        parameters: [
          {
            name: 'x-access-token',
            in: 'header',
            description: 'Authorization token',
            required: true,
            type: 'string'
          },
          {
            name: 'parcelId',
            in: 'path',
            description: 'Parcel ID',
            required: true,
            type: 'number'
          }
        ],
        responses: {
          200: {
            description: 'Parcels cancelled',
            schema: {
              type: 'object',
              items: {
                $ref: '#/definitions/Parcel'
              }
            }
          },
          401: {
            description: 'Unauthorised'
          },
          500: {
            description: 'Unexpected server error'
          }
        }
      }
    },
    '/parcels/{parcelId}/status': {
      put: {
        tags: ['Parcels'],
        summary: 'Change the status of a parcel delivery order',
        consumes: [
          'application/x-www-form-urlencoded'
        ],
        parameters: [
          {
            name: 'x-access-token',
            in: 'header',
            description: 'Authorization token',
            required: true,
            type: 'string'
          },
          {
            name: 'parcelId',
            in: 'path',
            description: 'Parcel ID',
            required: true,
            type: 'number'
          },
          {
            name: 'status',
            in: 'formData',
            description: 'new status',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'Parcels cancelled',
            schema: {
              type: 'object',
              items: {
                $ref: '#/definitions/Parcel'
              }
            }
          },
          401: {
            description: 'Unauthorised'
          },
          500: {
            description: 'Unexpected server error'
          }
        }
      }
    },
    '/parcels/{parcelId}/destination': {
      put: {
        tags: ['Parcels'],
        summary: "Change a parcel's destination",
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'x-access-token',
            in: 'header',
            description: 'Authorization token',
            required: true,
            type: 'string'
          },
          {
            name: 'parcelId',
            in: 'path',
            description: 'Parcel ID',
            required: true,
            type: 'number'
          },
          {
            name: 'to',
            in: 'formData',
            description: 'New destination',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'Parcel updated',
            schema: {
              type: 'object',
              items: {
                $ref: '#/definitions/Parcel'
              }
            }
          },
          401: {
            description: 'Unauthorised'
          },
          500: {
            description: 'Unexpected server error'
          }
        }
      }
    },
    '/parcels/{parcelId}/presentLocation': {
      put: {
        tags: ['Parcels'],
        summary: 'Change the current location of a parcel',
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'x-access-token',
            in: 'header',
            description: 'Authorization token',
            required: true,
            type: 'string'
          },
          {
            name: 'parcelId',
            in: 'path',
            description: 'Parcel ID',
            required: true,
            type: 'number'
          },
          {
            name: 'currentLocation',
            in: 'formData',
            description: 'The current location',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'Parcel updated',
            schema: {
              type: 'object',
              items: {
                $ref: '#/definitions/Parcel'
              }
            }
          },
          401: {
            description: 'Unauthorised'
          },
          500: {
            description: 'Unexpected server error'
          }
        }
      }
    }
  },
  definitions: {
    Parcel: {
      type: 'object',
      required: [
        'id',
        'placedBy',
        'weight',
        'weightmetric',
        'status',
        'currentLocation',
        'to',
        'from',
        'contactPhone',
        'contactEmail'
      ],
      properties: {
        id: {
          type: 'integer'
        },
        placedBy: {
          type: 'integer'
        },
        description: {
          type: 'string'
        },
        weight: {
          type: 'string'
        },
        weightmetric: {
          type: 'string'
        },
        cost: {
          type: 'integer'
        },
        status: {
          type: 'string'
        },
        currentLocation: {
          type: 'string'
        },
        to: {
          type: 'string'
        },
        from: {
          type: 'string'
        },
        contactPhone: {
          type: 'string'
        },
        contactEmail: {
          type: 'string'
        },
        presentMapPointer: {
          type: 'string'
        },
        sentOn: {
          type: 'string'
        },
        deliveredOn: {
          type: 'string'
        }
      }
    }
  }
};
