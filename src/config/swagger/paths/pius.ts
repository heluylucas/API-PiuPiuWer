import { OpenAPIV3 } from 'openapi-types';

export const piusSchema: OpenAPIV3.PathsObject = {
  '/pius': {
    get: {
      summary: 'Listar Pius',
      description: 'Listar todos os pius registrados no PiuPiuWer',
      tags: ['Pius'],
      security:
        [
          {
            bearerAuth: []
          }
        ],
      responses: {
        401: {
          description: 'Unauthorized',
        },
        400: {
          description: 'Bad Request',
        },
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                $ref: "#/components/schemas/Piu"
              },
            },
          },
        },
      },
    },
  },
  '/pius ': {
    post: {
      summary: 'Postar Piu',
      description: 'Postar um Piu no PiuPiuWer',
      tags: ['Pius'],
      security:
      [
        {
          bearerAuth: []
        }
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                text: { type: 'string' }
              },
            },
          },
        },
      },
      responses: {
        401: {
          description: 'Unauthorized',
        },
        400: {
          description: 'Bad Request',
        },
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                $ref: "#/components/schemas/Piu"
              },  
            },
          },
        },
      },
    },
  },
  '/pius/like': {
    post: {
      summary: 'Dar like ou dislike em um Piu',
      description: 'Dar like ou dislike no PiuPiuWer',
      tags: ['Pius'],
      security:
      [
        {
          bearerAuth: []
        }
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                piu_id: { type: 'string' }
              },
            },
          },
        },
      },
      responses: {
        401: {
          description: 'Unauthorized',
        },
        400: {
          description: 'Bad Request',
        },
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  operation: { 
                    type: "string",
                    default: "like | dislike"
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/pius/favorite': {
    post: {
      summary: 'Favoritar um Piu',
      description: 'Favoritar um no PiuPiuWer',
      tags: ['Pius'],
      security:
      [
        {
          bearerAuth: []
        }
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                piu_id: { type: 'string' }
              },
            },
          },
        },
      },
      responses: {
        401: {
          description: 'Unauthorized',
        },
        400: {
          description: 'Bad Request',
        },
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'object',
              },
            },
          },
        },
      },
    },
  },
  '/pius/unfavorite': {
    post: {
      summary: 'Desfavoritar um Piu',
      description: 'Desfavoritar um piu no PiuPiuWer',
      tags: ['Pius'],
      security:
      [
        {
          bearerAuth: []
        }
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                piu_id: { type: 'string' }
              },
            },
          },
        },
      },
      responses: {
        401: {
          description: 'Unauthorized',
        },
        400: {
          description: 'Bad Request',
        },
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'object',
              },
            },
          },
        },
      },
    },
  },
  '/pius  ': {
    delete: {
      summary: 'Deletar um Piu',
      description: 'Deletar um Piu do PiuPiuWer',
      tags: ['Pius'],
      security:
      [
        {
          bearerAuth: []
        }
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                text: { type: 'string' }
              },
            },
          },
        },
      },
      responses: {
        401: {
          description: 'Unauthorized',
        },
        400: {
          description: 'Bad Request',
        },
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  deleted: { 
                    type: "boolean",
                    default: true,
                  },
                },
              },  
            },
          },
        },
      },
    },
  },
};

export default piusSchema;
