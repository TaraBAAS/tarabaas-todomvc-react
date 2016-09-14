export default function getSchema () {
  return {
    name: 'todos',
    schema_fields: [
      {
        type: 'string',
        name: 'text'
      }, {
        type: 'boolean',
        name: 'completed',
        'default': false
      }
    ]
  };
}
