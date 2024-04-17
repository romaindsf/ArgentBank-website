export default function FeatureItem({ srcImg, itemTitle, itemDescription }) {
  return (
    <div className="feature-item">
      <img src={srcImg} alt="Chat Icon" className="feature-icon" />
      <h3 className="feature-item-title">{itemTitle}</h3>
      <p>{itemDescription}</p>
    </div>
  )
}
