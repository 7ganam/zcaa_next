import React, { useState } from 'react'
import styles from './DonationTargetComponent.module.css'
function DonationTargetComponent(props) {
    const [Selected, setSelected] = useState(null)

    const handleClick = (event) => {
        console.log(event.target.id)
        let id = event.target.id
        setSelected(id)

        switch (id) {
            case '1':
                props.setFieldValue('dontatedTo', 1)
                props.setDonationString('Community development and sustainability award honoring Omar-El Daghar'.split(' ').join('_'))
                break
            case '2':
                props.setFieldValue('dontatedTo', 2)
                props.setDonationString('Biomedical science research Award honoring Ghada Ragab'.split(' ').join('_'))
                break
            case '3':
                props.setFieldValue('dontatedTo', 3)
                props.setDonationString('Physics of Earth and universe award honoring Ahmed Thabet'.split(' ').join('_'))
                break
            case '4':
                props.setFieldValue('dontatedTo', 4)
                props.setDonationString('Green energy solutions Award honoring Ahmed Soliman'.split(' ').join('_'))
                break
            case '5':
                props.setFieldValue('dontatedTo', 5)
                props.setDonationString('Financial aid Award honoring Mahmoud Ogaina and Mohamed Nour El-din'.split(' ').join('_'))
                break
                break
            case '6':
                props.setFieldValue('dontatedTo', 6)
                props.setDonationString('Leadership and community engagement award honoring Noor El-din Mahmoud'.split(' ').join('_'))
                break
            case '7':
                props.setFieldValue('dontatedTo', 7)
                props.setDonationString('General Donation to any project'.split(' ').join('_'))
                break
            default:
                console.log(4)

                break
        }

    }

    return (
        <div className={styles.wrapper}>
            <div id='1' onClick={handleClick} className={`${styles.donation_option}   ${Selected == 1 ? styles.selected : ''}`}>
                Community development and sustainability award honoring Omar-El Daghar
            </div>
            <div id='2' onClick={handleClick} className={`${styles.donation_option}   ${Selected == 2 ? styles.selected : ''}`}>
                Biomedical science research Award honoring Ghada Ragab
            </div>
            <div id='3' onClick={handleClick} className={`${styles.donation_option}   ${Selected == 3 ? styles.selected : ''}`}>
                Physics of Earth and universe award honoring Ahmed Thabet
            </div>
            <div id='4' onClick={handleClick} className={`${styles.donation_option}   ${Selected == 4 ? styles.selected : ''}`}>
                Green energy solutions Award honoring Ahmed Soliman
            </div>
            <div id='5' onClick={handleClick} className={`${styles.donation_option}   ${Selected == 5 ? styles.selected : ''}`}>
                Financial aid Award honoring Mahmoud Ogaina and Mohamed Nour El-din
            </div>
            <div id='6' onClick={handleClick} className={`${styles.donation_option}   ${Selected == 6 ? styles.selected : ''}`}>
                Leadership and community engagement award honoring Noor El-din Mahmoud
            </div>
            <div id='7' onClick={handleClick} className={`${styles.donation_option}   ${Selected == 7 ? styles.selected : ''}`}>
                General Donation to any project
            </div>

        </div>
    )
}

export default DonationTargetComponent
