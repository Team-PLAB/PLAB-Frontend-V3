import styles from './style.module.css'

export const Loading = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.loader}/>
    </div>
  )
}