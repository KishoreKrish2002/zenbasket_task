const { PresignedPost } = require('aws-sdk/clients/s3');

require('dotenv').config();//instatiate environment variables

CONFIG = {}; //Make this global to use all over the application

CONFIG.app = process.env.APP || 'local';
CONFIG.port = process.env.PORT || '5000';

CONFIG.db_dialect = process.env.DB_DIALECT || 'postgresql';
CONFIG.db_host = process.env.DB_HOST || 'localhost';
CONFIG.db_port = process.env.DB_PORT || '3306';
CONFIG.db_name = process.env.DB_NAME || 'details';
CONFIG.db_user = process.env.DB_USER || 'centizen';
CONFIG.db_password = process.env.DB_PASSWORD || 'centizen';

CONFIG.max_pool_conn = process.env.MAX_POOL_CONN || '50';
CONFIG.min_pool_conn = process.env.MIN_POOL_CONN || '0';
