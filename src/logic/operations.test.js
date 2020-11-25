import assert from 'assert'
import { createNewValue, parsePartialJson } from './operations.js'
import { SELECTION_TYPE } from './selection.js'

describe('operations', () => {
  describe('createNewValue', () => {
    it('should create a value of type "value"', () => {
      assert.strictEqual(createNewValue({}, null, 'value'), '')
    })

    it('should create a value of type "object"', () => {
      assert.deepStrictEqual(createNewValue({}, null, 'object'), {})
    })

    it('should create a value of type "array"', () => {
      assert.deepStrictEqual(createNewValue({}, null, 'array'), [])
    })

    it('should create a simple value via type "structure"', () => {
      assert.deepStrictEqual(createNewValue([1, 2, 3], { type: SELECTION_TYPE.MULTI, paths: [[0]] }, 'structure'), '')
    })

    it('should create a nested object via type "structure"', () => {
      const doc = [
        {
          a: 2,
          b: {
            c: 3
          },
          d: [1, 2, 3]
        }
      ]

      assert.deepStrictEqual(createNewValue(doc, { type: SELECTION_TYPE.MULTI, paths: [[0]] }, 'structure'), {
        a: '',
        b: {
          c: ''
        },
        d: []
      })
    })
  })

  it('should parse partial JSON', () => {
    assert.deepStrictEqual(parsePartialJson('"hello world"'), 'hello world')
    assert.deepStrictEqual(parsePartialJson('null'), null)
    assert.deepStrictEqual(parsePartialJson('42'), 42)

    // parse partial array
    assert.deepStrictEqual(parsePartialJson('1,2'), [1, 2])
    assert.deepStrictEqual(parsePartialJson('1,2,'), [1, 2])

    // parse partial object
    const partialJson = '"str": "hello world",\n' +
      '"nill": null,\n' +
      '"bool": false'
    const expected = {
      str: 'hello world',
      nill: null,
      bool: false
    }
    assert.deepStrictEqual(parsePartialJson(partialJson), expected)
    assert.deepStrictEqual(parsePartialJson(partialJson + ','), expected)
  })

  // TODO: write tests for all operations
})
