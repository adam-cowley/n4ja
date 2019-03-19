<template>
    <dl>
        <template v-for="d in details">
            <n4ja-key
                :context="context" 
                :key="id + d.key + 'key'" 
                :name="d.key"
                :value="d.value"
                tag="dt"
            />
            
            <dd :key="id + d.key + 'value'" >
                <n4ja-value
                  :context="innerContext(d)" 
                  :name="d.key" 
                  :type="d.type" 
                  :value="d.value" 
                  :valueLimit="valueLimit"
                  :moreValuesText="moreValuesText"
                />
            </dd>
        </template>
    </dl>
</template>


<script>
export default {
    name: 'n4ja-property-list',

    props: {
        id: {
            type: [ String, Number ],
            description: 'The Internal ID of the node',
        },
        context: {
            type: [ Array, String, ],
            description: 'The context in which this card is being displayed',
        },
        node: {
            type: [ Object, ],
            description: 'The current node - used for additional context',
        },
        valueLimit: {
            type: [ Number, String ],
            description: 'Number of relationship entities to show',
        },
        moreValuesText: {
            type: [ Function, Number, String ],
            description: 'Number of relationship entities to show',
            default: count => `+ ${count} More&hellip;`,
        },

        /*
[
  {
    "type": "relationship",
    "value": [
      {
        "identity": {
          "low": 204176,
          "high": 0
        },
        "labels": [
          "Entity"
        ],
        "properties": {
          "sourceID": "Panama Papers",
          "address": "CAVERSHAM; CHARTERED CERTIFIED ACCOUNTANTS  P.O. BOX 1075 9 CASTLE STREET ST. HELIER; JERSEY JE4 2QP CHANNEL ISLANDS UNITED KINGDOM",
          "internal_id": "512694",
          "former_name": "HORIZON EMERGING FU",
          "jurisdiction": "BVI",
          "struck_off_date": "30-APR-2009",
          "service_provider": "Mossack Fonseca",
          "countries": "Jersey",
          "jurisdiction_description": "British Virgin Islands",
          "valid_until": "The Panama Papers data is current through 2015",
          "ibcRUC": "136273",
          "original_name": "HORIZON EMERGING INVESTMENTS LIMITED (EX-HORIZON EMERGING FU",
          "name": "HORIZON EMERGING INVESTMENTS LIMITED",
          "inactivation_date": "12-FEB-2008",
          "country_codes": "JEY",
          "incorporation_date": "20-DEC-1994",
          "status": "Dissolved",
          "node_id": "10062782"
        }
      }
    ],
    "key": "SHAREHOLDER_OF"
  },
  {
    "type": "relationship",
    "value": [
      {
        "identity": {
          "low": 1103,
          "high": 0
        },
        "labels": [
          "Address"
        ],
        "properties": {
          "sourceID": "Panama Papers",
          "address": "1 MALZARD HOUSE; 15 UNION STREET; ST HELIER; JERSEY C.I.",
          "valid_until": "The Panama Papers  data is current through 2015",
          "icij_id": "404D9A4738B26CEB6DC5BD9D5736B900",
          "country_codes": "JEY",
          "countries": "Jersey",
          "node_id": "14007338"
        }
      }
    ],
    "key": "REGISTERED_ADDRESS"
  },
  {
    "type": "relationship",
    "value": [
      {
        "identity": {
          "low": 841890,
          "high": 0
        },
        "labels": [
          "Officer"
        ],
        "properties": {
          "sourceID": "Panama Papers",
          "valid_until": "The Panama Papers data is current through 2015",
          "name": "CAVERSHAM SECRETARIES LIMITED",
          "icij_id": "DC8B12134A45F6D5748854D0513FE846",
          "country_codes": "JEY",
          "countries": "Jersey",
          "node_id": "12172676"
        }
      },
      {
        "identity": {
          "low": 841539,
          "high": 0
        },
        "labels": [
          "Officer"
        ],
        "properties": {
          "sourceID": "Panama Papers",
          "valid_until": "The Panama Papers data is current through 2015",
          "name": "CAVERSHAM SECRETARIES LIMITED",
          "icij_id": "90A70696DC26C30CD7992DF13B56996C",
          "country_codes": "JEY",
          "countries": "Jersey",
          "node_id": "12172637"
        }
      },
      {
        "identity": {
          "low": 842694,
          "high": 0
        },
        "labels": [
          "Officer"
        ],
        "properties": {
          "sourceID": "Panama Papers",
          "valid_until": "The Panama Papers data is current through 2015",
          "name": "CAVERSHAM SECRETARIES LIMITED",
          "icij_id": "AB9F2DA1C0E3236BBB7F22949F4E900F",
          "country_codes": "JEY",
          "countries": "Jersey",
          "node_id": "12173535"
        }
      },
      {
        "identity": {
          "low": 845496,
          "high": 0
        },
        "labels": [
          "Officer"
        ],
        "properties": {
          "sourceID": "Panama Papers",
          "valid_until": "The Panama Papers data is current through 2015",
          "name": "CAVERSHAM SECRETARIES LIMITED",
          "icij_id": "8F9A00CE13B67EF5B4F984A43BE8CCAE",
          "country_codes": "JEY",
          "countries": "Jersey",
          "node_id": "12176423"
        }
      },
      {
        "identity": {
          "low": 845478,
          "high": 0
        },
        "labels": [
          "Officer"
        ],
        "properties": {
          "sourceID": "Panama Papers",
          "valid_until": "The Panama Papers data is current through 2015",
          "name": "CAVERSHAM SECRETARIES LIMITED",
          "icij_id": "C9C9247F457688A4C10271BB821625EB",
          "country_codes": "JEY",
          "countries": "Jersey",
          "node_id": "12176408"
        }
      },
      {
        "identity": {
          "low": 804003,
          "high": 0
        },
        "labels": [
          "Officer"
        ],
        "properties": {
          "sourceID": "Panama Papers",
          "valid_until": "The Panama Papers data is current through 2015",
          "name": "CAVERSHAM SECRETARIES LIMITED",
          "icij_id": "E15A4FCA9168336256E5196AD2E369E8",
          "country_codes": "JEY",
          "countries": "Jersey",
          "node_id": "12161617"
        }
      },
      {
        "identity": {
          "low": 831539,
          "high": 0
        },
        "labels": [
          "Officer"
        ],
        "properties": {
          "sourceID": "Panama Papers",
          "valid_until": "The Panama Papers data is current through 2015",
          "name": "CAVERSHAM SECRETARIES LIMITED",
          "icij_id": "A8C404E177D6610A5955F8EE0193949E",
          "country_codes": "JEY",
          "countries": "Jersey",
          "node_id": "12161616"
        }
      },
      {
        "identity": {
          "low": 831494,
          "high": 0
        },
        "labels": [
          "Officer"
        ],
        "properties": {
          "sourceID": "Panama Papers",
          "valid_until": "The Panama Papers data is current through 2015",
          "name": "CAVERSHAM SECETARTIES LIMITED",
          "icij_id": "03F9C226856719889425D3F4C1EAC5E5",
          "country_codes": "JEY",
          "countries": "Jersey",
          "node_id": "12161566"
        }
      },
      {
        "identity": {
          "low": 831480,
          "high": 0
        },
        "labels": [
          "Officer"
        ],
        "properties": {
          "sourceID": "Panama Papers",
          "valid_until": "The Panama Papers data is current through 2015",
          "name": "CAVERSHAM SECRETARIES LIMITED",
          "icij_id": "8E2578090D53BD7FB8BDAC32FF932D65",
          "country_codes": "JEY",
          "countries": "Jersey",
          "node_id": "12161555"
        }
      },
      {
        "identity": {
          "low": 831338,
          "high": 0
        },
        "labels": [
          "Officer"
        ],
        "properties": {
          "sourceID": "Panama Papers",
          "valid_until": "The Panama Papers data is current through 2015",
          "name": "CAVERSHAM SECRETARIES LIMITED",
          "icij_id": "F3D7B9AE683AE90B9D7D9C9FEA6FDCF1",
          "country_codes": "JEY",
          "countries": "Jersey",
          "node_id": "12161550"
        }
      },
      {
        "identity": {
          "low": 803986,
          "high": 0
        },
        "labels": [
          "Officer"
        ],
        "properties": {
          "sourceID": "Panama Papers",
          "valid_until": "The Panama Papers data is current through 2015",
          "name": "CAVERSHAM SECRETARIES LIMITED",
          "icij_id": "511A656073B4802F396FA6CEADCA9FD7",
          "country_codes": "JEY",
          "countries": "Jersey",
          "node_id": "12161526"
        }
      },
      {
        "identity": {
          "low": 832138,
          "high": 0
        },
        "labels": [
          "Officer"
        ],
        "properties": {
          "sourceID": "Panama Papers",
          "valid_until": "The Panama Papers data is current through 2015",
          "name": "CAVERSHAM SECRETARIES LIMITED",
          "icij_id": "02EB39DB1F867F439B8A805565B21E9B",
          "country_codes": "JEY",
          "countries": "Jersey",
          "node_id": "12162260"
        }
      },
      {
        "identity": {
          "low": 842249,
          "high": 0
        },
        "labels": [
          "Officer"
        ],
        "properties": {
          "sourceID": "Panama Papers",
          "valid_until": "The Panama Papers data is current through 2015",
          "name": "CAVERSHAM SECRETARIES LIMITED",
          "icij_id": "56FD6DEC326B25A0FCEBE0531E251BDC",
          "country_codes": "JEY",
          "countries": "Jersey",
          "node_id": "12173055"
        }
      },
      {
        "identity": {
          "low": 819279,
          "high": 0
        },
        "labels": [
          "Officer"
        ],
        "properties": {
          "sourceID": "Panama Papers",
          "valid_until": "The Panama Papers data is current through 2015",
          "name": "CAVERSHAM SECRETARIES LIMITED",
          "icij_id": "869CAF62E48244FE3EC977636A5A2781",
          "country_codes": "JEY",
          "countries": "Jersey",
          "node_id": "12172359"
        }
      },
      {
        "identity": {
          "low": 841488,
          "high": 0
        },
        "labels": [
          "Officer"
        ],
        "properties": {
          "sourceID": "Panama Papers",
          "valid_until": "The Panama Papers data is current through 2015",
          "name": "CAVERSHAM  SECRETARIES LIMITED",
          "icij_id": "6D65A8B0FABC8CEEED31895C063ACD1F",
          "country_codes": "JEY",
          "countries": "Jersey",
          "node_id": "12172241"
        }
      },
      {
        "identity": {
          "low": 841534,
          "high": 0
        },
        "labels": [
          "Officer"
        ],
        "properties": {
          "sourceID": "Panama Papers",
          "valid_until": "The Panama Papers data is current through 2015",
          "name": "CAVERSHAM SECRETARIES LIMITED",
          "icij_id": "2AC5B10377FAE67D1FCF0F23263D5B2B",
          "country_codes": "JEY",
          "countries": "Jersey",
          "node_id": "12172287"
        }
      },
      {
        "identity": {
          "low": 840801,
          "high": 0
        },
        "labels": [
          "Officer"
        ],
        "properties": {
          "sourceID": "Panama Papers",
          "valid_until": "The Panama Papers data is current through 2015",
          "name": "CAVERSHAM SECRETARIES LIMITED",
          "icij_id": "A45E496E45AEF252FEE5C5007D06CD4D",
          "country_codes": "JEY",
          "countries": "Jersey",
          "node_id": "12171531"
        }
      },
      {
        "identity": {
          "low": 840779,
          "high": 0
        },
        "labels": [
          "Officer"
        ],
        "properties": {
          "sourceID": "Panama Papers",
          "valid_until": "The Panama Papers data is current through 2015",
          "name": "CAVERSHAM SECRETRIES  LIMITED",
          "icij_id": "2E363D9C00E337BB44F6683A6BA21D85",
          "country_codes": "JEY",
          "countries": "Jersey",
          "node_id": "12171508"
        }
      },
      {
        "identity": {
          "low": 840778,
          "high": 0
        },
        "labels": [
          "Officer"
        ],
        "properties": {
          "sourceID": "Panama Papers",
          "valid_until": "The Panama Papers data is current through 2015",
          "name": "CAVERSHAM SECERTARIES LIMITED",
          "icij_id": "F742737C60ECB34DD87A26DEEC9812F2",
          "country_codes": "JEY",
          "countries": "Jersey",
          "node_id": "12171507"
        }
      },
      {
        "identity": {
          "low": 840777,
          "high": 0
        },
        "labels": [
          "Officer"
        ],
        "properties": {
          "sourceID": "Panama Papers",
          "valid_until": "The Panama Papers data is current through 2015",
          "name": "CAVERSHAM SECURITIES LIMITED",
          "icij_id": "C9C9A194956D040FB0F42CEC36BDA6DD",
          "country_codes": "JEY",
          "countries": "Jersey",
          "node_id": "12171506"
        }
      },
      {
        "identity": {
          "low": 842221,
          "high": 0
        },
        "labels": [
          "Officer"
        ],
        "properties": {
          "sourceID": "Panama Papers",
          "valid_until": "The Panama Papers data is current through 2015",
          "name": "CAVERSHAM SECRETARIES LIMITED",
          "icij_id": "9714B8F9E2462951C6EFB424C1AC8964",
          "country_codes": "JEY",
          "countries": "Jersey",
          "node_id": "12173030"
        }
      },
      {
        "identity": {
          "low": 842200,
          "high": 0
        },
        "labels": [
          "Officer"
        ],
        "properties": {
          "sourceID": "Panama Papers",
          "valid_until": "The Panama Papers data is current through 2015",
          "name": "CAVERSHAM SECRETARIES LIMITED",
          "icij_id": "28B607A9F7893741E7A7D44F69C5E8BE",
          "country_codes": "JEY",
          "countries": "Jersey",
          "node_id": "12172998"
        }
      },
      {
        "identity": {
          "low": 842214,
          "high": 0
        },
        "labels": [
          "Officer"
        ],
        "properties": {
          "sourceID": "Panama Papers",
          "valid_until": "The Panama Papers data is current through 2015",
          "name": "CAVERSHAM SECREATRIES LIMITED",
          "icij_id": "B9A182409E53EDB4F585D32BBAF6A03D",
          "country_codes": "JEY",
          "countries": "Jersey",
          "node_id": "12173028"
        }
      }
    ],
    "key": "SIMILAR_NAME_AND_ADDRESS_AS"
  },
  {
    "type": "property",
    "value": "Panama Papers",
    "key": "sourceID"
  },
  {
    "type": "property",
    "value": "12016663",
    "key": "node_id"
  },
  {
    "type": "property",
    "value": "Jersey",
    "key": "countries"
  },
  {
    "type": "property",
    "value": "JEY",
    "key": "country_codes"
  },
  {
    "type": "property",
    "value": "The Panama Papers data is current through 2015",
    "key": "valid_until"
  },
  {
    "type": "property",
    "value": "F91B810CC30AF4635866FB068A058D2E",
    "key": "icij_id"
  },
  {
    "type": "property",
    "value": "CAVERSHAM SECRETARIES LIMITED",
    "key": "name"
  }
]
        */
        details: {
            type: Array,
        },
    },


    methods: {
        innerContext(d) {
            if ( d.type == 'relationship' ) {
                return this.castContext.concat(d.key);
            }

            return this.context;
        },
        // keyComponent(d) {
        //     const base = 'n4ja-key';
        //     const context = this.castContext.concat(d.key);

        //     // Check context with key
        //     const contextKey = this.getContextComponent(base, context);
        //     if ( contextKey != base ) {
        //         return contextKey;
        //     }

        //     // Check key
        //     return this.getContextComponent(base, d.key);
        // },
    }
}
</script>
