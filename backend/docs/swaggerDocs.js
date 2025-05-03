import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Job Portal API',
      version: '1.0.0',
      description: 'Job Portal API Documentation',
      contact: {
        name: 'API Support',
        email: '',
      },
    },
    servers: [
      // {
      //   url: 'http://localhost:3000',
      //   description: 'Development server',
      // },
      {
        url: process.env.FRONTEND_URL,
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token'
        }
      },
      schemas: {
        User: {
          type: 'object',
          required: ['fullname', 'email', 'phoneNumber', 'password', 'role'],
          properties: {
            fullname: { type: 'string' },
            email: { type: 'string', format: 'email' },
            phoneNumber: { type: 'number' },
            password: { type: 'string', format: 'password' },
            role: { type: 'string', enum: ['student', 'recruiter', 'superUser'] },
            profile: {
              type: 'object',
              properties: {
                bio: { type: 'string' },
                skills: { type: 'array', items: { type: 'string' } },
                resume: { type: 'string' },
                resumeOriginalName: { type: 'string' },
                company: { type: 'string', format: 'uuid' },
                profilePhoto: { type: 'string' }
              }
            }
          }
        },
        Company: {
          type: 'object',
          required: ['name', 'userId'],
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            website: { type: 'string' },
            location: { type: 'string' },
            logo: { type: 'string' },
            userId: { type: 'string', format: 'uuid' }
          }
        },
        Job: {
          type: 'object',
          required: ['title', 'description', 'salary', 'experienceLevel', 'location', 'jobType', 'position', 'company', 'created_by'],
          properties: {
            title: { type: 'string' },
            description: { type: 'string' },
            requirements: { type: 'array', items: { type: 'string' } },
            salary: { type: 'string' },
            experienceLevel: { type: 'number' },
            location: { type: 'string' },
            jobType: { type: 'string' },
            position: { type: 'number' },
            company: { type: 'string', format: 'uuid' },
            created_by: { type: 'string', format: 'uuid' },
            applications: { type: 'array', items: { type: 'string', format: 'uuid' } }
          }
        },
        Application: {
          type: 'object',
          required: ['job', 'applicant'],
          properties: {
            job: { type: 'string', format: 'uuid' },
            applicant: { type: 'string', format: 'uuid' },
            status: { type: 'string', enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
          }
        },
        Blog: {
          type: 'object',
          required: ['title', 'content', 'author'],
          properties: {
            title: { type: 'string' },
            content: { type: 'string' },
            author: { type: 'string', format: 'uuid' },
            tags: { type: 'array', items: { type: 'string' } },
            image: { type: 'string' }
          }
        },
        Comment: {
          type: 'object',
          required: ['content', 'author', 'blog'],
          properties: {
            content: { type: 'string' },
            author: { type: 'string', format: 'uuid' },
            blog: { type: 'string', format: 'uuid' }
          }
        }
      }
    },
    security: [
      {
        cookieAuth: []
      }
    ]
  },
  apis: ['./docs/swaggerApiDocs.js'],
};

const specs = swaggerJsDoc(options);



// Function to setup Swagger docs with Express
const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
  console.log('Swagger documentation available at /api-docs');
};

export default setupSwagger;