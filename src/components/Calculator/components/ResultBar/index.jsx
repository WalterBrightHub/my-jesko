import React, { useState } from 'react'


import './index.css'

const ResultBar = ({ process, garbage, p2w }) => {
  const [showReport, setShowReport] = useState(false)
  const toggleOpen = (e) => {
    setShowReport(!showReport)
  }
  return <div>
    <div className="placeholder bar">A</div>
    <div className='result-block'>
      {
        showReport
          ? <div>
            <div onClick={toggleOpen} style={{ height: 1000, backgroundColor: 'rgba(0,0,0,0.5)' }}> </div>
            <div className='report-block'>
              <div className="report-item">
                {
                  garbage.map(({ car, label, perfect }) => (
                    <div className='car-block' style={{ backgroundColor: perfect ? '#acf2bd' : '#fdb8c0' }} key={car}>
                      <div className="car-name">{car}</div>
                      <div className="label">{label}</div>
                    </div>
                  ))
                }
              </div>
              <div className="report-item">经过你的努力</div>
              <div className="report-item">你最高可以获得 <span className='strong'>{process.sp}</span> SP</div>
              {
                process.stage > 17
                  ? <div className="report-item">你最高可以进入<span className='strong'>九王{process.stage - 17}</span></div>
                  : <div className="report-item"><span className="strong">很遗憾</span> 你没有进入九王</div>
              }
              {
                p2w
                  ? <div className="report-item">恭喜你使用了钞能力获取 Jesko 钥匙 <span role='img' aria-label='key'>🔑</span>  <span className='unlock'>已可解锁</span></div>
                  : process.sp >= 580000
                    ? <div className="report-item">恭喜你获得足够的 SP 获取 Jesko 钥匙 <span role='img' aria-label='key'>🔑</span>  <span className='unlock'>已可解锁</span></div>
                    : <div className="report-item">你没有足够的 SP 获取 Jesko 钥匙 <span role='img' aria-label='key'>🔑</span> <span className='warn'>您不配拿</span></div>
              }
              {
                process.sp >= 623000
                  ? <div className="report-item">恭喜你获得足够的 SP 获取 Jesko 贴纸 <span role='img' aria-label='skin'>🍉</span> <span className='unlock'>已可解锁</span></div>
                  : <div className="report-item">你没有足够的 SP 获取 Jesko 贴纸 <span role='img' aria-label='skin'>🍉</span> <span className='warn'>您不配拿</span></div>
              }
            </div>
          </div>
          : <div></div>
      }
      <div className="result-bar bar">
        <div className="sp-block">
          <div className="sp-icon">SP</div>
          <div className="sp-num">{process.sp}</div>
        </div>
        <div className="open-block" onClick={toggleOpen}>
          <div className="open">{showReport ? '收起详情▼' : '展开详情▲'}</div>

        </div>
      </div>
    </div>
  </div>
}

export default ResultBar
