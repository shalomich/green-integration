import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import pluginQuery from '@tanstack/eslint-plugin-query';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import functionalPlugin from 'eslint-plugin-functional';
import { createNodeResolver, default as importPlugin } from 'eslint-plugin-import-x';
import jsdoc from 'eslint-plugin-jsdoc';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginTestingLibrary from 'eslint-plugin-testing-library';
import { defineConfig, globalIgnores } from 'eslint/config';
import typescriptEslint from 'typescript-eslint';

export default defineConfig(
  globalIgnores(['dist/*', 'build/*']),
  pluginQuery.configs['flat/recommended'],
  {
    extends: [
      eslint.configs.recommended,
      stylistic.configs.recommended,
      typescriptEslint.configs.recommendedTypeChecked,
      typescriptEslint.configs.stylisticTypeChecked,
      jsdoc.configs['flat/recommended-typescript'],
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
      functionalPlugin.configs.off,
    ],
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      '@stylistic/array-bracket-newline': [
        'error',
        {
          multiline: true,
        },
      ],
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/array-element-newline': ['error', 'consistent'],
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/arrow-spacing': 'error',
      '@stylistic/brace-style': ['error', '1tbs'],
      '@stylistic/comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          enums: 'always-multiline',
          exports: 'always-multiline',
          functions: 'always-multiline',
          generics: 'always-multiline',
          imports: 'always-multiline',
          objects: 'always-multiline',
          tuples: 'always-multiline',
        },
      ],
      '@stylistic/comma-spacing': [
        'error',
        {
          after: true,
          before: false,
        },
      ],
      '@stylistic/comma-style': 'error',
      '@stylistic/computed-property-spacing': ['error', 'never'],
      '@stylistic/dot-location': ['error', 'property'],
      '@stylistic/eol-last': 'error',
      '@stylistic/function-call-argument-newline': ['error', 'consistent'],
      '@stylistic/function-call-spacing': ['error', 'never'],
      '@stylistic/function-paren-newline': ['error', 'consistent'],
      '@stylistic/implicit-arrow-linebreak': 0,
      '@stylistic/indent': [
        'error',
        2,
        {
          ignoredNodes: [
            'TSTypeAliasDeclaration *',
            'TSTypeParameterInstantiation > *',
            'TSTypeAnnotation',
            'ArrowFunctionExpression Identifier',
            'ArrowFunctionExpression BlockStatement',
          ],
          SwitchCase: 1,
        },
      ],
      '@stylistic/jsx-quotes': ['error', 'prefer-double'],
      '@stylistic/key-spacing': [
        'error',
        {
          mode: 'strict',
        },
      ],
      '@stylistic/keyword-spacing': [
        'error',
        {
          after: true,
          before: true,
        },
      ],
      '@stylistic/line-comment-position': [
        'error',
        {
          position: 'above',
        },
      ],
      '@stylistic/linebreak-style': ['error', 'unix'],
      '@stylistic/lines-around-comment': [
        'error',
        {
          allowArrayEnd: true,
          allowArrayStart: true,
          allowBlockEnd: true,
          allowBlockStart: true,
          allowClassEnd: true,
          allowClassStart: true,
          allowObjectEnd: true,
          allowObjectStart: true,
          beforeLineComment: true,
        },
      ],
      '@stylistic/lines-between-class-members': ['error', 'always'],
      '@stylistic/max-len': [
        'error', {
          code: 140,
          ignoreComments: true,
          ignorePattern: '^import .*',
          ignoreStrings: true,
        },
      ],
      '@stylistic/max-statements-per-line': [
        'error',
        {
          max: 1,
        },
      ],
      '@stylistic/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'semi',
            requireLast: true,
          },
          singleline: {
            delimiter: 'semi',
            requireLast: true,
          },
        },
      ],
      '@stylistic/new-parens': 'error',
      '@stylistic/newline-per-chained-call': [
        'error',
        {
          ignoreChainWithDepth: 2,
        },
      ],
      '@stylistic/no-extra-semi': 'error',
      '@stylistic/no-floating-decimal': 'error',
      '@stylistic/no-mixed-spaces-and-tabs': 'error',
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxBOF: 1, maxEOF: 0 }],
      '@stylistic/no-tabs': 'error',
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/no-whitespace-before-property': 'error',
      '@stylistic/object-curly-newline': [
        'error',
        {
          consistent: true,
          multiline: true,
        },
      ],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/object-property-newline': [
        'error',
        {
          allowAllPropertiesOnSameLine: true,
        },
      ],
      '@stylistic/operator-linebreak': [
        'error',
        'after',
        {
          overrides: {
            '|': 'ignore',
          },
        },
      ],
      '@stylistic/quote-props': ['error', 'consistent-as-needed'],
      '@stylistic/quotes': [
        'error',
        'single',
        {
          allowTemplateLiterals: 'always',
        },
      ],
      '@stylistic/rest-spread-spacing': ['error', 'never'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/semi-style': ['error', 'last'],
      '@stylistic/space-before-blocks': 'error',
      '@stylistic/space-before-function-paren': [
        'error', {
          anonymous: 'always',
          asyncArrow: 'always',
          catch: 'always',
          named: 'never',
        },
      ],
      '@stylistic/space-in-parens': ['error', 'never'],
      '@stylistic/space-infix-ops': ['error', { int32Hint: false }],
      '@stylistic/space-unary-ops': 'error',
      '@stylistic/spaced-comment': [
        'error',
        'always',
        {
          markers: ['/'],
        },
      ],
      '@stylistic/switch-colon-spacing': 'error',
      '@stylistic/template-curly-spacing': ['error', 'never'],
      '@stylistic/template-tag-spacing': ['error', 'never'],
      '@stylistic/type-annotation-spacing': 'error',
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'array',
        },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-imports': [
        'error', {
          disallowTypeAnnotations: true,
          fixStyle: 'inline-type-imports',
          prefer: 'type-imports',
        },
      ],
      '@typescript-eslint/dot-notation': 'error',
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
        },
      ],
      '@typescript-eslint/explicit-member-accessibility': 'error',
      '@typescript-eslint/member-ordering': 'off',
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          format: ['camelCase'],
          leadingUnderscore: 'allow',
          selector: 'default',
          trailingUnderscore: 'allow',
        },
        {
          format: ['camelCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
          selector: 'variable',
          trailingUnderscore: 'allow',
        },
        {
          format: ['PascalCase'],
          selector: 'typeLike',
        },
        {
          format: ['PascalCase'],
          selector: 'enumMember',
        },
      ],
      '@typescript-eslint/no-base-to-string': 'off',
      '@typescript-eslint/no-confusing-non-null-assertion': 'error',
      '@typescript-eslint/no-duplicate-type-constituents': [
        'error',
        {
          ignoreIntersections: false,
          ignoreUnions: false,
        },
      ],
      '@typescript-eslint/no-empty-object-type': [
        'error',
        {
          allowInterfaces: 'never',
          allowObjectTypes: 'always',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-enum-comparison': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: false,
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/prefer-function-type': 'error',
      '@typescript-eslint/prefer-includes': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/require-array-sort-compare': 'error',
      '@typescript-eslint/restrict-plus-operands': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': [
        'error',
        {
          allowDefaultCaseForExhaustiveSwitch: false,
          considerDefaultExhaustiveForUnions: true,
          requireDefaultForNonUnion: true,
        },
      ],
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/unified-signatures': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'class-methods-use-this': 'off',
      'curly': ['error', 'all'],
      'default-case-last': 'error',
      'dot-notation': 'off',
      'eqeqeq': ['error', 'smart'],
      'func-name-matching': 'error',
      'func-style': [
        'error',
        'declaration',
        {
          allowArrowFunctions: true,
        },
      ],
      'functional/readonly-type': 'error',
      'getter-return': 'error',
      'import/no-named-as-default-member': 'off',
      'import/order': [
        'error',
        {
          'distinctGroup': false,
          'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
          'newlines-between': 'always',
          'pathGroupsExcludedImportTypes': [],
        },
      ],
      'import/prefer-default-export': 'off',
      'jsdoc/check-alignment': 'error',
      'jsdoc/check-param-names': [
        'warn',
        {
          checkDestructured: false,
          enableFixer: false,
        },
      ],
      'jsdoc/check-tag-names': 'error',
      'jsdoc/no-bad-blocks': 'error',
      'jsdoc/no-types': 'error',
      'jsdoc/require-description-complete-sentence': [
        'error',
        {
          tags: ['see', 'copyright'],
        },
      ],
      'jsdoc/require-jsdoc': [
        'error',
        {
          checkConstructors: false,
          checkGetters: true,
          checkSetters: true,
          contexts: [
            'ClassDeclaration',
            'TSEnumDeclaration',
            'ExportNamedDeclaration[declaration.type="TSInterfaceDeclaration"]',
            'TSInterfaceDeclaration :matches(TSCallSignatureDeclaration, TSMethodSignature, TSPropertySignature)',
            'TSTypeAliasDeclaration :matches(TSCallSignatureDeclaration, TSMethodSignature, TSPropertySignature)',
            'ExportNamedDeclaration[declaration.type="TSTypeAliasDeclaration"]',
            'ExportNamedDeclaration[declaration.type="VariableDeclaration"]',
            'MethodDefinition:not([accessibility="private"])',
            'PropertyDefinition:not([accessibility="private"])',
            'FunctionDeclaration[id.name!="fromDto"][id.name!="toDto"][id.name!="validationErrorFromDto"]',
          ],
          enableFixer: false,

          // Disable default JSDoc requirement since we define required functions manually.
          // See - https://eslint.org/docs/latest/rules/require-jsdoc#rule-details
          require: { FunctionDeclaration: false },
        },
      ],
      'jsdoc/require-param': [
        'error',
        {
          checkDestructured: false,
          contexts: ['FunctionDeclaration'],
          enableFixer: false,
        },
      ],
      'jsdoc/require-param-description': 'error',
      'jsdoc/require-param-name': 'error',
      'jsdoc/require-param-type': 'off',
      'jsdoc/require-returns': 'off',
      'jsdoc/require-returns-type': 'off',
      'jsdoc/tag-lines': 'error',
      'max-classes-per-file': ['warn', 3],
      'max-depth': ['error', 3],
      'max-lines': 'off',
      'max-lines-per-function': ['error', 120],
      'max-params': 'off',
      'no-alert': 'error',
      'no-array-constructor': 'error',
      'no-async-promise-executor': 'error',
      'no-await-in-loop': 'error',
      'no-bitwise': 'error',
      'no-caller': 'error',
      'no-case-declarations': 'error',
      'no-class-assign': 'error',
      'no-compare-neg-zero': 'error',
      'no-cond-assign': 'error',
      'no-console': [
        'error',
        {
          allow: ['error', 'warn'],
        },
      ],
      'no-constant-condition': 'error',
      'no-constructor-return': 'error',
      'no-control-regex': 'error',
      'no-debugger': 'error',
      'no-delete-var': 'error',
      'no-dupe-args': 'error',
      'no-dupe-class-members': 0,
      'no-dupe-else-if': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-duplicate-imports': 'error',
      'no-else-return': 'error',
      'no-empty': 'error',
      'no-empty-character-class': 'error',
      'no-empty-function': [
        'error',
        {
          allow: ['constructors'],
        },
      ],
      'no-empty-pattern': 'error',
      'no-eval': 'error',
      'no-ex-assign': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'error',
      'no-extra-boolean-cast': 'error',
      'no-fallthrough': 'error',
      'no-func-assign': 'error',
      'no-global-assign': 'error',
      'no-implied-eval': 'error',
      'no-import-assign': 'error',
      'no-invalid-regexp': 'error',
      'no-irregular-whitespace': 'error',
      'no-iterator': 'error',
      'no-labels': 'error',
      'no-lone-blocks': 'error',
      'no-lonely-if': 'error',
      'no-loop-func': 'error',
      'no-loss-of-precision': 'error',
      'no-magic-numbers': 'off',
      'no-misleading-character-class': 'error',
      'no-multi-assign': 'error',
      'no-multi-str': 'off',
      'no-negated-condition': 'off',
      'no-nested-ternary': 'error',
      'no-new': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-nonoctal-decimal-escape': 'error',
      'no-obj-calls': 'error',
      'no-octal': 'error',
      'no-octal-escape': 'error',
      'no-param-reassign': 'error',
      'no-promise-executor-return': 'error',
      'no-proto': 'error',
      'no-prototype-builtins': 'error',
      'no-regex-spaces': 'error',
      'no-restricted-syntax': [
        'error',
        {
          message: 'Use \'readonly T[]\' instead of a mutable array layout.',
          selector: 'TSArrayType:not(VariableDeclarator *):not([returnType] *):not(TSTypeOperator[operator="readonly"] > TSArrayType)',
        },
        {
          message: 'Use \'readonly [T1, T2]\' instead of a mutable tuple.',
          selector: 'TSTupleType:not(VariableDeclarator *):not([returnType] *):not(TSConditionalType *):not(TSTypeOperator[operator="readonly"] > TSTupleType)',
        },
      ],
      'no-return-assign': 'error',
      'no-script-url': 'error',
      'no-self-assign': 'error',
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-setter-return': 'error',
      'no-shadow': 'off',
      'no-shadow-restricted-names': 'error',
      'no-sparse-arrays': 'error',
      'no-template-curly-in-string': 'error',
      'no-this-before-super': 'error',
      'no-throw-literal': 'error',
      'no-undef-init': 'error',
      'no-underscore-dangle': 'off',
      'no-unexpected-multiline': 'error',
      'no-unneeded-ternary': 'error',
      'no-unreachable': 'error',
      'no-unreachable-loop': 'error',
      'no-unsafe-finally': 'error',
      'no-unsafe-negation': 'error',
      'no-unsafe-optional-chaining': 'error',
      'no-unused-expressions': 'error',
      'no-useless-call': 'error',
      'no-useless-catch': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-concat': 'error',
      'no-useless-escape': 'error',
      'no-useless-rename': 'error',
      'no-useless-return': 'error',
      'no-var': 'error',
      'no-void': 'error',
      'no-with': 'error',
      'object-shorthand': [
        'error',
        'always',
        {
          avoidExplicitReturnArrows: true,
        },
      ],
      'one-var': ['error', 'never'],
      'operator-assignment': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',
      'prefer-destructuring': [
        'error',
        {
          array: false,
          object: true,
        },
      ],
      'prefer-exponentiation-operator': 'error',
      'prefer-named-capture-group': 'off',
      'prefer-object-spread': 'error',
      'prefer-promise-reject-errors': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      'radix': 'error',
      'require-atomic-updates': 'error',
      'require-await': 'error',
      'require-unicode-regexp': 'off',
      'require-yield': 'error',
      'symbol-description': 'error',
      'use-isnan': 'error',
      'yoda': [
        'error',
        'never',
        {
          exceptRange: true,
        },
      ],
    },
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver(),
        createNodeResolver(),
      ],
    },
  },
  {
    files: ['**/*.dto.ts', '**/*.mapper.ts', '**/*-api.ts'],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
    },
  },
  {
    files: ['**/*.spec.{ts,tsx}'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/naming-convention': 'off',
      'jsdoc/require-jsdoc': 'off',
      'max-classes-per-file': 'off',
      'max-lines-per-function': 'off',
    },
  },
  {
    extends: [typescriptEslint.configs.disableTypeChecked],
    files: ['**/*.{js,mjs,cjs}'],
  },
  {
    extends: [
      pluginReact.configs.flat.recommended,
      pluginReact.configs.flat['jsx-runtime'],
      pluginReactHooks.configs.flat.recommended,
      pluginJsxA11y.flatConfigs.recommended,
    ],
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/naming-convention': 'off',
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          aspects: ['noHref', 'invalidHref'],
        },
      ],
      'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-proptypes': 'error',
      'jsx-a11y/aria-role': [
        'error',
        {
          ignoreNonDOM: true,
        },
      ],
      'jsx-a11y/aria-unsupported-elements': 'error',
      'jsx-a11y/heading-has-content': 'error',
      'jsx-a11y/iframe-has-title': 'error',
      'jsx-a11y/img-redundant-alt': 'error',
      'jsx-a11y/no-access-key': 'error',
      'jsx-a11y/no-distracting-elements': 'error',
      'jsx-a11y/no-redundant-roles': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/role-supports-aria-props': 'error',
      'jsx-a11y/scope': 'error',
      'max-lines-per-function': 'off',
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react/forbid-foreign-prop-types': [
        'error',
        {
          allowInPropTypes: true,
        },
      ],
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
        },
      ],
      '@stylistic/jsx-closing-bracket-location': ['error', 'tag-aligned'],
      '@stylistic/jsx-closing-tag-location': 'error',
      '@stylistic/jsx-first-prop-new-line': ['error', 'multiline'],
      '@stylistic/jsx-indent-props': ['error', 2],
      '@stylistic/jsx-max-props-per-line': [
        'error',
        {
          maximum: {
            multi: 1,
            single: 4,
          },
        },
      ],

      'react/jsx-no-comment-textnodes': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-target-blank': 'error',
      'react/jsx-no-undef': 'error',
      '@stylistic/jsx-one-expression-per-line': [
        'error',
        {
          allow: 'literal',
        },
      ],
      'react/jsx-pascal-case': 'error',
      '@stylistic/jsx-wrap-multilines': [
        'error',
        {
          arrow: 'parens-new-line',
          assignment: 'parens-new-line',
          condition: 'parens-new-line',
          declaration: 'parens-new-line',
          logical: 'parens-new-line',
          prop: 'parens-new-line',
          return: 'parens-new-line',
        },
      ],
      'react/no-danger-with-children': 'error',
      'react/no-direct-mutation-state': 'error',
      'react/no-is-mounted': 'error',
      'react/no-typos': 'error',
      'react/prop-types': 'off',
      'react/require-render-return': 'error',
      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: true,
        },
      ],
      'react/style-prop-object': 'error',
    },
    settings: {
      react: {
        version: '19.2',
      },
    },
  },
  {
    extends: [pluginTestingLibrary.configs['flat/react']],
    files: ['**/*.spec.tsx'],
  },
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    rules: {
      'import/order': [
        'error',
        {
          'distinctGroup': false,
          'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
          'newlines-between': 'always',
          'pathGroups': [
            {
              group: 'internal',
              pattern: 'src/**',
              position: 'after',
            },
          ],
          'pathGroupsExcludedImportTypes': [],
        },
      ],
    },
  },
);
