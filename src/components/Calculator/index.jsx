import React, { useState, useEffect } from 'react'
import { List, Radio, } from 'antd-mobile';
import CarTitle from './components/carTitle';
import ResultBar from './components/ResultBar'

import './index.css'




const RadioItem = Radio.RadioItem;
const cars = ['50th',
  'G60',
  'DB11',
  '220',
  'M4',
  'H2',
  'Scalo',
  '488',
  'tdf',
  '812',
  'GT12',
  'Jesko']

//危险3能获得的SP，不包括国服两个杰哥特殊SP
const cost = {
  '11': 1980,
  '12': 2160,
  '13': 2340,
  '14': 2475,
  '15': 2700,
  '16': 2925,
  '17': 3150,
  '18': 3300,
  '19': 3600,
  '20': 3900,
  '21': 4200,
  '22': 4500,
}


const initStage = {
  //每辆车最多走到第几关
  '50th': 16,
  'G60': 12,
  'DB11': 11,
  '220': 13,
  'M4': 10,
  'H2': 10,
  'Scalo': 12,
  '488': 11,
  'tdf': 10,
  '812': 14,
  'GT12': 16,
  'Jesko': 16,
}

const noSkip = {

  //每辆车卡关
  '50th': [17, 19, 20],
  'G60': [13, 16, 18, 21],
  'DB11': [12, 16, 19],
  '220': [14, 20],
  'M4': [11, 15, 20],
  'H2': [11, 12, 15, 19, 21],
  'Scalo': [13, 14, 16, 17, 18, 20, 21],
  '488': [12, 13, 14, 17, 18],
  'tdf': [11, 12, 16, 17, 18, 21],
  '812': [15, 20, 21, 22],
  'GT12': [17, 19, 21, 22],
  'Jesko': [17, 19, 20, 21, 22],
}

//解锁阶段所需sp
const spToLock = {
  '18': 329000,
  '19': 364000,
  '20': 410000,
  '21': 470000,
  '22': 545000,
}

//每一阶段可获得的sp
const spCanGet = {
  '17': 369873,//九王之前全通关
  '18': 34320,
  '19': 46800,
  '20': 60840,
  '21': 112240,
  '22': 80600,
}

const getProcess = stage => {
  let cars = Object.keys(noSkip)
  let sp = spCanGet[17]
  //console.log(`stage 17 sp=>${sp}`)
  for (let i = 11; i <= 17; i++) {
    for (let car of cars) {
      if (stage[car] < i && noSkip[car].indexOf(i) !== -1) {
        //不足以到达此关，并且此关卡关
        //console.log(`${car} sp-${cost[i]}=>${sp+cost[i]}`)
        sp -= cost[i]
      }
    }
  }
  if (sp < spToLock[18]) {
    return {
      sp,
      stage: 17
    }
  }



  for (let i = 18; i <= 22; i++) {
    //console.log(`stage ${i} sp+${spCanGet[i]}=>${sp+spCanGet[i]}`)
    sp += spCanGet[i]
    for (let car of cars) {
      //不足以到达此关，并且此关卡关
      if (stage[car] < i && noSkip[car].indexOf(i) !== -1) {
        //杰哥最后两阶段，牙膏射了
        if (car === 'Jesko' && i >= 21) {
          if (i === 21) {
            sp -= 40000
            //console.log(`sp -40000 =>${sp}`)
          }
          else if (i === 22) {
            sp -= 50000
            //console.log(`sp-50000=>${sp}`)
          }
        }
        else {
          //console.log(`${car} sp-${cost[i]}=>${sp-cost[i]}`)
          sp -= cost[i]
        }
      }
      // //console.log(i)
      // //console.log(sp)
    }

    //不足以解锁下一关
    if (sp < spToLock[i + 1]) {
      return {
        sp,
        stage: i
      }
    }
  }

  return {
    sp,
    stage: 22
  }
}

const stages = {
  '50th': [
    {
      value: 16,
      label: '★★（及以下）',
    },
    {
      value: 22,
      label: '★★★'
    }
  ],
  'G60': [
    {
      value: 12,
      label: '★★★（及以下）'
    },
    {
      value: 15,
      label: '★★★★',
    },
    {
      value: 22,
      label: '★★★★ 金卡*1'
    }
  ],

  'DB11': [

    {
      value: 11,
      label: '★★（及以下）'
    },
    {
      value: 22,
      label: '★★★'
    },
  ],
  '220': [

    {
      value: 13,
      label: '★★★★（及以下）'
    },
    {
      value: 22,
      label: '★★★★ 金卡*1'
    },
  ],
  'M4': [

    {
      value: 10,
      label: '★★'
    },
    {
      value: 22,
      label: '★★★'
    },
  ],
  'H2': [

    {
      value: 10,
      label: '★（及以下）'
    },
    {
      value: 11,
      label: '★★'
    },
    {
      value: 14,
      label: '★★★'
    },
    {
      value: 20,
      label: '★★★★ 金卡不足7'
    },
    {
      value: 22,
      label: '★★★★ 金卡*7'
    },
  ],
  'Scalo': [

    {
      value: 12,
      label: '未解锁'
    },
    {
      value: 13,
      label: '★'
    },
    {
      value: 15,
      label: '★★'
    },
    {
      value: 17,
      label: '★★★'
    },
    {
      value: 19,
      label: '★★★★ 无金卡'
    },
    {
      value: 20,
      label: '★★★★ 3011分',
      extra: '推荐改装：2张金卡插在极速上'
    },
    {
      value: 22,
      label: '★★★★ 3041分',
      extra: '推荐改装：4张金卡插在极速、加速上'
    },
  ],
  '488': [

    {
      value: 11,
      label: '★（及以下）',
    },
    {
      value: 12,
      label: '★★',
    },
    {
      value: 13,
      label: '★★★',
    },
    {
      value: 22,
      label: '★★★★',
    },
  ],
  'tdf': [

    {
      value: 10,
      label: '未解锁',
    },
    {
      value: 11,
      label: '★',
    },
    {
      value: 15,
      label: '★★',
    },
    {
      value: 16,
      label: '★★★',
    },
    {
      value: 17,
      label: '★★★★',
    },
    {
      value: 20,
      label: '★★★★★',
    },
    {
      value: 22,
      label: '★★★★★ 3650分',
      extra: '8张金卡，极速上无金卡；或9张金卡'
    },
  ],
  '812': [

    {
      value: 14,
      label: '★（及以下）',
    },
    {
      value: 19,
      label: '★★',
    },
    {
      value: 20,
      label: '★★★',
    },
    {
      value: 21,
      label: '★★★★',
    },
    {
      value: 22,
      label: '★★★★★',
    },
  ],
  'GT12': [

    {
      value: 16,
      label: '★（及以下）',
    },
    {
      value: 18,
      label: '★★',
    },
    {
      value: 20,
      label: '★★★',
    },
    {
      value: 21,
      label: '★★★★',
    },
    {
      value: 22,
      label: '★★★★★',
    },
  ],
  'Jesko': [

    {
      value: 16,
      label: '★',
    },
    {
      value: 18,
      label: '★★',
    },
    {
      value: 20,
      label: '★★★',
    },
    {
      value: 21,
      label: '★★★★★',
    },
    {
      value: 22,
      label: '★★★★★★ 4626分',
      extra: '至少需1张金卡'
    },
  ],

}

const getGarbage = (stage) => {
  console.log(typeof stage)
  return cars.map(car => {
    let target = stages[car].filter(i => i.value === stage[car])[0]
    return {
      car,
      label: target.label,
      perfect: target.value === 22
    }
  })
}

// const cars = Object.keys(stages)


const Calculator = () => {
  const [stage, setStage] = useState(initStage)
  // const [data,setData]=useState(initData)

  useEffect(() => {
    let localStage = localStorage.getItem('stage')
    if (localStage) {
      setStage(JSON.parse(localStage))
    }
  }, [])

  const changeValue = (car, value) => {
    let newStage = {
      ...stage,
      [car]: value

    }
    setStage(newStage)

    localStorage.setItem('stage', JSON.stringify(newStage))
  }


  return <div>
    <div className="tip">
      <div className='tip-text'>请根据你的车库情况，逐一选择最符合的选项。</div>
      <div className='tip-text'>程序将自动计算所能获得的SP，能解锁的关卡，以及能否获取Jesko钥匙和贴纸。</div>
    </div>
    {
      cars.map(car => (
        <List key={car} renderHeader={() => (<CarTitle car={car} />)}>
          {

            stages[car].map(i => (
              <RadioItem key={i.value} checked={stage[car] === i.value} onChange={() => changeValue(car, i.value)}>
                {i.label}<List.Item.Brief>{i.extra}</List.Item.Brief>
              </RadioItem>
            ))
          }
        </List>
      ))
    }
    <ResultBar process={getProcess(stage)} garbage={getGarbage(stage)} p2w={stage['Jesko']>13} />
  </div>
}

export default Calculator