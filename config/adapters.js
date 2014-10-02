/**
 * Global adapter config
 * 
 * The `adapters` configuration object lets you create different global "saved settings"
 * that you can mix and match in your models.  The `default` option indicates which 
 * "saved setting" should be used if a model doesn't have an adapter specified.
 *
 * Keep in mind that options you define directly in your model definitions
 * will override these settings.
 *
 * For more information on adapter configuration, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.adapters = {

  'default': 'mssql',

  // Persistent adapter for DEVELOPMENT ONLY
  // (data is preserved when the server shuts down)
  disk: {
    module: 'sails-disk',
    migrate: 'drop',
  },

  // Eventually from configuration file.
  mssql: {
    module: 'sails-mssql',
    user: 'SP_RO',
    password: 'password',
    database: 'QSI_Test',
    host: 'parachemsrv07',
    port: 1433,
    schema: true,
    migrate: 'safe',
  },


};