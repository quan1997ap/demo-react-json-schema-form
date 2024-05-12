/**
 * https://react-json-schema-form-builder.readthedocs.io/en/main/Usage/#custom-form-inputs
 */


import { FormBuilder } from "@ginkgo-bioworks/react-json-schema-form-builder";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "@rjsf/core";

// return error message for parsing or blank if no error
function checkError(text) {
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    return e.toString();
  }
  if (typeof data === 'string') {
    return 'Received a string instead of object.';
  }
  return '';
}

const styles = {
  codeViewer: {
    backgroundColor: 'lightgray',
    maxHeight: '550px',
    overflowY: 'auto',
  },
};


export default function App() {
  const [schema, setSchema] = useState(
    JSON.stringify(
      {
        type: 'object',
        title: 'Create service',
        properties: {
          name: {
            title: 'Name',
            type: 'string'
          },
          desc: {
            title: 'Desc',
            type: 'string'
          },
          config: {
            title: 'Config',
            type: 'object',
            properties: {
              url: {
                title: 'Url',
                type: 'string'
              },
              method: {
                title: 'Method',
                type: 'string'
              }
            },
            dependencies: {},
            required: []
          }
        },
        dependencies: {},
        required: [
          'name'
        ]
      }
    )
  );
  const [uischema, setUiSchema] = useState(
    JSON.stringify(
      {
        config: {
          'ui:order': [
            'url',
            'method'
          ]
        },
        'ui:order': [
          'name',
          'desc',
          'config'
        ]
      }
    )
  );
  const [formData, setFormData] = useState(
    {
      "config": {
        "url": "https://ginkgobioworks.github.io/react-json-schema-form-builder/",
        "method": "Post"
      },
      "name": "Service A"
    }
  );

  return (
    <div className="App">
      {/* <FormBuilder
        schema={schema}
        uischema={uischema}
        onChange={(newSchema, newUiSchema) => {
          setSchema(newSchema);
          setUiSchema(newUiSchema);
        }}
      /> */}

      <Form
        schema={JSON.parse(schema)}
        uiSchema={JSON.parse(uischema)}
        formData={formData}
        onChange={(newFormData) => {
          const schemaError = checkError(schema);
          const schemaUiError = checkError(uischema);
          console.log(newFormData, schemaError, schemaUiError)
        }}
        submit={(newFormData) => {
          const schemaError = checkError(schema);
          const schemaUiError = checkError(uischema);
          console.log(newFormData, schemaError, schemaUiError)
        }}
        submitButtonMessage={"Submit"}
      />

    </div>
  );
}