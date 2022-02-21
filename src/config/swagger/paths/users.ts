import { OpenAPIV3 } from 'openapi-types';

export const usersSchema: OpenAPIV3.PathsObject = {
  '/users': {
    get: {
      summary: 'Listar Usuários',
      description: 'Listar todos os usários cadastrados no PiuPiuWer',
      tags: ['Users'],
      security:
        [
          {
            bearerAuth: []
          }
        ],
      parameters:[
        {
          "name": "username",
          "in": "query",
          "description": "Filter by username",
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
                $ref: "#/components/schemas/User"
              },
            },
          },
        },
      },
    },
  },
  '/register': {
    post: {
      summary: 'Cadastrar Usuário',
      description: 'Cadastrar um usuário no PiuPiuWer',
      tags: ['Users'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: "#/components/schemas/User"
            },
          },
        },
      },
      responses: {
        400: {
          description: 'Bad Request',
        },
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                $ref: "#/components/schemas/User"
              },
            },
          },
        },
      },
    },
  },
  '/users/follow': {
    post: {
      summary: 'Seguir outro Usuário',
      description: 'Cadastrar outro usuário no PiuPiuWer',
      tags: ['Users'],
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
              type: 'array',
              items: {
                properties:{
                  user_id: { type: 'string' }
                },
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
};

export default usersSchema;
