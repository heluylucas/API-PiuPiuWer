import { OpenAPIV3 } from 'openapi-types';
import paths from './paths';

const swagger: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'API do projeto PiuPiuWer - treinamento Backend',
    description: 'Documentação',
    contact: {
      email: 'lucas.heluy@polijunior.com.br',
    },
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:3333/',
      description: 'Local server',
    },
    {
      url: 'https://sua-url.com/',
      description: 'Deployed server',
    },
  ],
  paths: paths,
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          username: { type: 'string' },
          first_name:{ type: 'string' },
          last_name: { type: 'string' },
          email: { type: 'string' },
          about: { type: 'string' },
          photo: { type: 'string' },
          pius:{ 
            type: 'array',
            items:{
              $ref: "#/components/schemas/Piu"
            }
          },
          likes:{ 
            type: 'array',
            items:{
              $ref: "#/components/schemas/PiuLike"
            }
          },
          following: { 
            type: 'array',
            items:{
              $ref: "#/components/schemas/User"
            }
          },
          followers: { 
            type: 'array',
            items:{
              $ref: "#/components/schemas/User"
            }
          },
          favorites: { 
            type: 'array',
            items:{
              $ref: "#/components/schemas/Piu"
            }
          },
        },
      },
      PiuLike: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          user: { 
            $ref: "#/components/schemas/User"
          },
          piu: {
            $ref: "#/components/schemas/Piu"
          },
        },
      },
      Piu: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          user: { 
            $ref: "#/components/schemas/User"
          },
          text: { type: 'string' },
          likes: { 
            type: 'array',
            items:{
              $ref: "#/components/schemas/PiuLike"
            }
          },
        },
      },

    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

export default swagger;
