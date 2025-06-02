import styles from "./style.module.css"

import { useState } from "react"
import { Tooltip } from "~/allFiles"
import { useLab } from "~/hooks/useLab"

const Board = () => {
    const [floor, setFloor] = useState(1);
    const { getAllLabRentals } = useLab();
    const rentalRequests = getAllLabRentals.data || [];

    const rentalMap = rentalRequests.reduce(
        (map: Record<string, any>, request: any) => {
            map[request.labName] = request;
            return map;
        },
        {} as Record<string, any>
    );
    const getBoxProps = (labName: string) => {
        const rental = rentalMap[labName];
        if (rental) {
            const text = `대여자: ${rental.rentalUsers}\n 목적: ${rental.rentalPurpose}\n시간: ${rental.rentalStartTime}`;
            return {
                className: `${styles.box} ${styles.use}`,
                children: <Tooltip text={text}>{labName}</Tooltip>,
            };
        }
        return {
            className: `${styles.box} ${styles.empty}`,
            children: labName,
        };
    };

    const renderFloor = (floorNum: number) => {
        switch (floorNum) {
            case 1:
                return (
                    <div className={styles.gridContainer}>
                        <div className={`${styles.box} ${styles.no}`}>화장실</div>
                        <div className={`${styles.box} ${styles.no}`}>승강기</div>
                        <div className={styles.stairs} />
                        <div className={`${styles.box} ${styles.no}`}>회의실</div>
                        <div {...getBoxProps("컴퓨터 교육실")} />
                        <div className={`${styles.box} ${styles.no} ${styles.colSpan2}`}>산학협력부</div>
                        <div {...getBoxProps("NCS 게임콘텐츠 제작실습실2")} />
                        <div className={styles.stairs} />
                        <div className={`${styles.box} ${styles.no}`}>화장실</div>
                        <div className={`${styles.stairs} ${styles.colSpan10}`} />
                        <div className={`${styles.box} ${styles.no} ${styles.colSpan3}`}>SW쉼터</div>
                        <div className={`${styles.box} ${styles.no}`}>소프트웨어<br />개발과3-1반</div>
                        <div className={`${styles.box} ${styles.no}`}>소프트웨어<br />개발과3-2반</div>
                        <div className={`${styles.box} ${styles.no}`}>인공지능<br />소프트웨어<br />개발과3-1반</div>
                        <div className={`${styles.box} ${styles.no}`}>게임<br />개발과3-1반</div>
                        <div className={`${styles.box} ${styles.no}`}>LAB1</div>
                        <div className={`${styles.box} ${styles.no}`}>LAB2</div>
                        <div {...getBoxProps("LAB3")} />
                    </div>
                );
            case 2:
                return (
                    <div className={styles.gridContainer}>
                        <div className={`${styles.box} ${styles.no}`}>화장실</div>
                        <div className={`${styles.box} ${styles.no}`}>승강기</div>
                        <div className={styles.stairs} />
                        <div {...getBoxProps("NCS 인공지능모델링 실습실1")} />
                        <div {...getBoxProps("NCS 인공지능모델링 실습실2")} />
                        <div className={`${styles.box} ${styles.no} ${styles.colSpan2}`}>교무실2</div>
                        <div {...getBoxProps("NCS 응용 프로그래밍 실습실1")} />
                        <div className={styles.stairs} />
                        <div className={`${styles.box} ${styles.no}`}>화장실</div>
                        <div className={`${styles.stairs} ${styles.colSpan10}`} />
                        <div className={`${styles.box} ${styles.no} ${styles.colSpan2}`}>진로상담실</div>
                        <div className={`${styles.box} ${styles.no}`}>산학교사실</div>
                        <div className={`${styles.box} ${styles.no}`}>소프트웨어<br />개발과2-1반</div>
                        <div className={`${styles.box} ${styles.no}`}>소프트웨어<br />개발과2-2반</div>
                        <div className={`${styles.box} ${styles.no}`}>인공지능<br />소프트웨어<br />개발과2-1반</div>
                        <div className={`${styles.box} ${styles.no}`}>게임<br />개발과2-1반</div>
                        <div className={`${styles.box} ${styles.no}`}>정보통신실2</div>
                        <div className={`${styles.box} ${styles.no}`}>LAB5</div>
                        <div className={`${styles.box} ${styles.no}`}>창고</div>
                    </div>
                );
            case 3:
                return (
                    <div className={styles.gridContainer}>
                        <div className={`${styles.box} ${styles.no}`}>화장실</div>
                        <div className={`${styles.box} ${styles.no}`}>승강기</div>
                        <div className={styles.stairs} />
                        <div {...getBoxProps("NCS 응용 프로그래밍 실습실2")} />
                        <div {...getBoxProps("NCS 게임콘텐츠 제작실습실1")} />
                        <div className={`${styles.box} ${styles.no}`}>위클래스</div>
                        <div {...getBoxProps("SW 채움교실")} />
                        <div className={styles.stairs} />
                        <div className={`${styles.box} ${styles.no}`}>화장실</div>
                        <div className={`${styles.stairs} ${styles.colSpan10}`} />
                        <div className={`${styles.box} ${styles.no}`}>마을림</div>
                        <div className={`${styles.box} ${styles.no}`}>학생회의실</div>
                        <div className={`${styles.box} ${styles.no}`}>교무실3</div>
                        <div className={`${styles.box} ${styles.no}`}>소프트웨어<br />개발과1-1반</div>
                        <div className={`${styles.box} ${styles.no}`}>소프트웨어<br />개발과1-2반</div>
                        <div className={`${styles.box} ${styles.no}`}>소프트웨어<br />개발과1-3반</div>
                        <div className={`${styles.box} ${styles.no}`}>소프트웨어<br />개발과1-4반</div>
                        <div className={`${styles.box} ${styles.no}`}>LAB6</div>
                        <div {...getBoxProps("LAB7")} />
                        <div className={`${styles.box} ${styles.no}`}>SW테라스</div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div className={styles.buttonContainer}>
                {[1, 2, 3].map((f) => (
                    <button
                        key={f}
                        className={`${styles.fButton} ${floor === f ? styles.active : ""}`}
                        onClick={() => setFloor(f)}
                    >
                        {f + 1}층
                    </button>
                ))}
            </div>

            {renderFloor(floor)}

            <div className={styles.stateContainer}>
                <div className={styles.stateItem}>
                    <div className={`${styles.colorBox} ${styles.empty}`} />
                    <span>신청 가능</span>
                </div>
                <div className={styles.stateItem}>
                    <div className={`${styles.colorBox} ${styles.use}`} />
                    <span>신청 마감</span>
                </div>
                <div className={styles.stateItem}>
                    <div className={`${styles.colorBox} ${styles.no}`} />
                    <span>신청 불가</span>
                </div>
            </div>
        </>
    );
};

export default Board;