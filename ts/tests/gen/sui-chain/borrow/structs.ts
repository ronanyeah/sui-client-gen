import {
  PhantomReified,
  Reified,
  ToField,
  ToTypeArgument,
  ToTypeStr,
  TypeArgument,
  assertFieldsWithTypesArgsMatch,
  assertReifiedTypeArgsMatch,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  extractType,
  fieldToJSON,
  phantom,
  toBcs,
} from '../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../_framework/util'
import { Option } from '../../move-stdlib-chain/option/structs'
import { ID } from '../object/structs'
import { BcsType, bcs, fromB64, fromHEX, toHEX } from '@mysten/bcs'
import { SuiClient, SuiParsedData } from '@mysten/sui.js/client'

/* ============================== Referent =============================== */

export function isReferent(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith('0x2::borrow::Referent<')
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface ReferentFields<T0 extends TypeArgument> {
  id: ToField<'address'>
  value: ToField<Option<T0>>
}

export type ReferentReified<T0 extends Reified<TypeArgument, any>> = Reified<
  Referent<ToTypeArgument<T0>>,
  ReferentFields<ToTypeArgument<T0>>
>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class Referent<T0 extends TypeArgument> {
  static readonly $typeName = '0x2::borrow::Referent'
  static readonly $numTypeParams = 1

  readonly $typeName = Referent.$typeName

  readonly $fullTypeName: `0x2::borrow::Referent<${string}>`

  readonly $typeArg: string

  readonly id: ToField<'address'>
  readonly value: ToField<Option<T0>>

  private constructor(typeArg: string, fields: ReferentFields<T0>) {
    this.$fullTypeName = composeSuiType(
      Referent.$typeName,
      typeArg
    ) as `0x2::borrow::Referent<${ToTypeStr<T0>}>`

    this.$typeArg = typeArg

    this.id = fields.id
    this.value = fields.value
  }

  static reified<T0 extends Reified<TypeArgument, any>>(T0: T0): ReferentReified<T0> {
    return {
      typeName: Referent.$typeName,
      fullTypeName: composeSuiType(
        Referent.$typeName,
        ...[extractType(T0)]
      ) as `0x2::borrow::Referent<${ToTypeStr<ToTypeArgument<T0>>}>`,
      typeArgs: [T0],
      fromFields: (fields: Record<string, any>) => Referent.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Referent.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => Referent.fromBcs(T0, data),
      bcs: Referent.bcs(toBcs(T0)),
      fromJSONField: (field: any) => Referent.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => Referent.fromJSON(T0, json),
      fetch: async (client: SuiClient, id: string) => Referent.fetch(client, T0, id),
      new: (fields: ReferentFields<ToTypeArgument<T0>>) => {
        return new Referent(extractType(T0), fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Referent.reified
  }

  static phantom<T0 extends Reified<TypeArgument, any>>(
    T0: T0
  ): PhantomReified<ToTypeStr<Referent<ToTypeArgument<T0>>>> {
    return phantom(Referent.reified(T0))
  }
  static get p() {
    return Referent.phantom
  }

  static get bcs() {
    return <T0 extends BcsType<any>>(T0: T0) =>
      bcs.struct(`Referent<${T0.name}>`, {
        id: bcs.bytes(32).transform({
          input: (val: string) => fromHEX(val),
          output: (val: Uint8Array) => toHEX(val),
        }),
        value: Option.bcs(T0),
      })
  }

  static fromFields<T0 extends Reified<TypeArgument, any>>(
    typeArg: T0,
    fields: Record<string, any>
  ): Referent<ToTypeArgument<T0>> {
    return Referent.reified(typeArg).new({
      id: decodeFromFields('address', fields.id),
      value: decodeFromFields(Option.reified(typeArg), fields.value),
    })
  }

  static fromFieldsWithTypes<T0 extends Reified<TypeArgument, any>>(
    typeArg: T0,
    item: FieldsWithTypes
  ): Referent<ToTypeArgument<T0>> {
    if (!isReferent(item.type)) {
      throw new Error('not a Referent type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return Referent.reified(typeArg).new({
      id: decodeFromFieldsWithTypes('address', item.fields.id),
      value: decodeFromFieldsWithTypes(Option.reified(typeArg), item.fields.value),
    })
  }

  static fromBcs<T0 extends Reified<TypeArgument, any>>(
    typeArg: T0,
    data: Uint8Array
  ): Referent<ToTypeArgument<T0>> {
    const typeArgs = [typeArg]

    return Referent.fromFields(typeArg, Referent.bcs(toBcs(typeArgs[0])).parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      value: fieldToJSON<Option<T0>>(`0x1::option::Option<${this.$typeArg}>`, this.value),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArg: this.$typeArg, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends Reified<TypeArgument, any>>(
    typeArg: T0,
    field: any
  ): Referent<ToTypeArgument<T0>> {
    return Referent.reified(typeArg).new({
      id: decodeFromJSONField('address', field.id),
      value: decodeFromJSONField(Option.reified(typeArg), field.value),
    })
  }

  static fromJSON<T0 extends Reified<TypeArgument, any>>(
    typeArg: T0,
    json: Record<string, any>
  ): Referent<ToTypeArgument<T0>> {
    if (json.$typeName !== Referent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(Referent.$typeName, extractType(typeArg)),
      [json.$typeArg],
      [typeArg]
    )

    return Referent.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T0 extends Reified<TypeArgument, any>>(
    typeArg: T0,
    content: SuiParsedData
  ): Referent<ToTypeArgument<T0>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isReferent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Referent object`)
    }
    return Referent.fromFieldsWithTypes(typeArg, content)
  }

  static async fetch<T0 extends Reified<TypeArgument, any>>(
    client: SuiClient,
    typeArg: T0,
    id: string
  ): Promise<Referent<ToTypeArgument<T0>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Referent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isReferent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Referent object`)
    }
    return Referent.fromBcs(typeArg, fromB64(res.data.bcs.bcsBytes))
  }
}

/* ============================== Borrow =============================== */

export function isBorrow(type: string): boolean {
  type = compressSuiType(type)
  return type === '0x2::borrow::Borrow'
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface BorrowFields {
  ref: ToField<'address'>
  obj: ToField<ID>
}

export type BorrowReified = Reified<Borrow, BorrowFields>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class Borrow {
  static readonly $typeName = '0x2::borrow::Borrow'
  static readonly $numTypeParams = 0

  readonly $typeName = Borrow.$typeName

  readonly $fullTypeName: '0x2::borrow::Borrow'

  readonly ref: ToField<'address'>
  readonly obj: ToField<ID>

  private constructor(fields: BorrowFields) {
    this.$fullTypeName = Borrow.$typeName

    this.ref = fields.ref
    this.obj = fields.obj
  }

  static reified(): BorrowReified {
    return {
      typeName: Borrow.$typeName,
      fullTypeName: composeSuiType(Borrow.$typeName, ...[]) as '0x2::borrow::Borrow',
      typeArgs: [],
      fromFields: (fields: Record<string, any>) => Borrow.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Borrow.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Borrow.fromBcs(data),
      bcs: Borrow.bcs,
      fromJSONField: (field: any) => Borrow.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Borrow.fromJSON(json),
      fetch: async (client: SuiClient, id: string) => Borrow.fetch(client, id),
      new: (fields: BorrowFields) => {
        return new Borrow(fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Borrow.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Borrow>> {
    return phantom(Borrow.reified())
  }
  static get p() {
    return Borrow.phantom()
  }

  static get bcs() {
    return bcs.struct('Borrow', {
      ref: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      obj: ID.bcs,
    })
  }

  static fromFields(fields: Record<string, any>): Borrow {
    return Borrow.reified().new({
      ref: decodeFromFields('address', fields.ref),
      obj: decodeFromFields(ID.reified(), fields.obj),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Borrow {
    if (!isBorrow(item.type)) {
      throw new Error('not a Borrow type')
    }

    return Borrow.reified().new({
      ref: decodeFromFieldsWithTypes('address', item.fields.ref),
      obj: decodeFromFieldsWithTypes(ID.reified(), item.fields.obj),
    })
  }

  static fromBcs(data: Uint8Array): Borrow {
    return Borrow.fromFields(Borrow.bcs.parse(data))
  }

  toJSONField() {
    return {
      ref: this.ref,
      obj: this.obj,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Borrow {
    return Borrow.reified().new({
      ref: decodeFromJSONField('address', field.ref),
      obj: decodeFromJSONField(ID.reified(), field.obj),
    })
  }

  static fromJSON(json: Record<string, any>): Borrow {
    if (json.$typeName !== Borrow.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return Borrow.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Borrow {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBorrow(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Borrow object`)
    }
    return Borrow.fromFieldsWithTypes(content)
  }

  static async fetch(client: SuiClient, id: string): Promise<Borrow> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Borrow object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isBorrow(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Borrow object`)
    }
    return Borrow.fromBcs(fromB64(res.data.bcs.bcsBytes))
  }
}
