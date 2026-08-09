/** NES 테트리스 스타일 춤추는 픽셀 인형 */
export default function DancingCharacter({ showCaption = true, large = false }) {
  const rootClass = large ? 'dance-overlay dance-overlay-large' : 'dance-overlay'

  return (
    <div className={rootClass} aria-live="polite">
      <div className="dance-scene">
        <div className="dancer">
          <div className="dancer-head">
            <span className="dancer-hair" />
            <span className="dancer-face" />
          </div>
          <div className="dancer-body">
            <span className="dancer-scarf" />
            <span className="dancer-shirt" />
            <span className="dancer-belt" />
          </div>
          <div className="dancer-arms">
            <span className="dancer-arm dancer-arm-left" />
            <span className="dancer-arm dancer-arm-right" />
          </div>
          <div className="dancer-legs">
            <span className="dancer-leg dancer-leg-left" />
            <span className="dancer-leg dancer-leg-right" />
          </div>
        </div>
        <div className="dance-stage" />
        {showCaption && <p className="dance-caption">STAGE CLEAR!</p>}
      </div>
    </div>
  )
}
