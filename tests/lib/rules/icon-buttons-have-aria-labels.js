/**
 * @fileoverview Report when a button component or element contains an SVG icon without accompanying text or aria-label
 * @author Charisse De Torres
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/icon-buttons-have-aria-labels');
const RuleTester = require('eslint').RuleTester;
const ERROR_MSG = require('../../../constants');

const parserOptions = {
    ecmaVersion: 6,
    ecmaFeatures: {
        jsx: true,
    },
};

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester({ parserOptions });
ruleTester.run('icon-buttons-have-aria-labels', rule, {
    valid: [
        // { code: "<button aria-label='button-label'><svg></svg></button>" }, NO
        // html
        { code: '<button>hello world</button>' },

        // jsx
        { code: '<Button>hello world</Button>' },
        { code: '<Button aria-label="an aria-label"><SomeIconComponent/></Button>' },
        { code: '<Button>\n<SomeIconComponent/> hello</Button>' },
    ],

    invalid: [
        // html
        {
            code: '<button></button>',
            errors: [{ message: 'No empty buttons' }],
        },

        // jsx
        {
            code: '<Button></Button>',
            errors: [{ message: 'No empty buttons' }],
        },
        {
            code: '<Button><SomeIconComponent/></Button>',
            errors: [{ message: 'No buttons that contains only icons.' }],
        },
        {
            code: '<Button aria-label=""><SomeIconComponent/></Button>',
            errors: [{ message: 'No empty aria-label' }],
        },
    ],
});
