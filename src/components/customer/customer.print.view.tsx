import { useRef, useState } from 'react'
import { ComponentToPrint } from './printComponent'
import { useReactToPrint } from 'react-to-print';
import useCustomerController from './customer.controller';
import { ICustomer } from './customer.model';
import './customer.css';
import html2canvas from 'html2canvas';

const CustomerPrintView: React.FC<{ selectedCus: ICustomer }> = ({ selectedCus }) => {
    const {
        headerChecked,
        deliChecked,
        setDelicheck,
        setHdcheck,
        codAmount,
        setCodAmount,
        remark,
        setRemark
    } = useCustomerController();
    const [noDeli, setNoDeli] = useState<boolean>(false);

    const componentRef = useRef<HTMLDivElement>(null);
    // const imgRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    const handleDownloadImage = async () => {

        if (componentRef.current) {
            try {
                const canvas = await html2canvas(componentRef.current);
                const image = canvas.toDataURL('image/png');
                console.log(image);
                // Here, you can use the 'image' data URL as needed (e.g., display it, save it, etc.)
                const link = document.createElement('a');

                if (typeof link.download === 'string') {
                    link.href = image;
                    link.download = 'image.jpg';

                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else {
                    window.open(image);
                }
            } catch (error) {
                console.error('Error capturing image:', error);
            }
        }
    };

    return (
        <div className='print-container'>
            <ComponentToPrint ref={componentRef} props={
                <div className='print-section-container'>
                    {headerChecked && <span style={{ marginBottom: '5px', fontSize: '1.5em', fontWeight: 'bold', fontFamily: 'cursive', alignSelf: 'center' }}>ITVerse</span>}
                    <div style={{ display: 'flex', alignItems: 'center', }}>
                        <div style={{ width: '30px' }}>
                            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div style={{ marginLeft: '15px', }}>
                            <span className='cusinfo-text-small'>{selectedCus?.name}</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ width: '30px' }}>
                            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 5.5C3 14.0604 9.93959 21 18.5 21C18.8862 21 19.2691 20.9859 19.6483 20.9581C20.0834 20.9262 20.3009 20.9103 20.499 20.7963C20.663 20.7019 20.8185 20.5345 20.9007 20.364C21 20.1582 21 19.9181 21 19.438V16.6207C21 16.2169 21 16.015 20.9335 15.842C20.8749 15.6891 20.7795 15.553 20.6559 15.4456C20.516 15.324 20.3262 15.255 19.9468 15.117L16.74 13.9509C16.2985 13.7904 16.0777 13.7101 15.8683 13.7237C15.6836 13.7357 15.5059 13.7988 15.3549 13.9058C15.1837 14.0271 15.0629 14.2285 14.8212 14.6314L14 16C11.3501 14.7999 9.2019 12.6489 8 10L9.36863 9.17882C9.77145 8.93713 9.97286 8.81628 10.0942 8.64506C10.2012 8.49408 10.2643 8.31637 10.2763 8.1317C10.2899 7.92227 10.2096 7.70153 10.0491 7.26005L8.88299 4.05321C8.745 3.67376 8.67601 3.48403 8.55442 3.3441C8.44701 3.22049 8.31089 3.12515 8.15802 3.06645C7.98496 3 7.78308 3 7.37932 3H4.56201C4.08188 3 3.84181 3 3.63598 3.09925C3.4655 3.18146 3.29814 3.33701 3.2037 3.50103C3.08968 3.69907 3.07375 3.91662 3.04189 4.35173C3.01413 4.73086 3 5.11378 3 5.5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div style={{ marginLeft: '15px' }}>
                            <span className='cusinfo-text-small'>{selectedCus?.phone}</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ width: '30px', alignSelf: 'flex-start' }}>
                            <svg style={{ alignSelf: 'flex-start' }} width="25px" height="25px" viewBox="0 0 1024 1024" fill="#000000" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M512 1012.8c-253.6 0-511.2-54.4-511.2-158.4 0-92.8 198.4-131.2 283.2-143.2h3.2c12 0 22.4 8.8 24 20.8 0.8 6.4-0.8 12.8-4.8 17.6-4 4.8-9.6 8.8-16 9.6-176.8 25.6-242.4 72-242.4 96 0 44.8 180.8 110.4 463.2 110.4s463.2-65.6 463.2-110.4c0-24-66.4-70.4-244.8-96-6.4-0.8-12-4-16-9.6-4-4.8-5.6-11.2-4.8-17.6 1.6-12 12-20.8 24-20.8h3.2c85.6 12 285.6 50.4 285.6 143.2 0.8 103.2-256 158.4-509.6 158.4z m-16.8-169.6c-12-11.2-288.8-272.8-288.8-529.6 0-168 136.8-304.8 304.8-304.8S816 145.6 816 313.6c0 249.6-276.8 517.6-288.8 528.8l-16 16-16-15.2zM512 56.8c-141.6 0-256.8 115.2-256.8 256.8 0 200.8 196 416 256.8 477.6 61.6-63.2 257.6-282.4 257.6-477.6C768.8 172.8 653.6 56.8 512 56.8z m0 392.8c-80 0-144.8-64.8-144.8-144.8S432 160 512 160c80 0 144.8 64.8 144.8 144.8 0 80-64.8 144.8-144.8 144.8zM512 208c-53.6 0-96.8 43.2-96.8 96.8S458.4 401.6 512 401.6c53.6 0 96.8-43.2 96.8-96.8S564.8 208 512 208z" fill="" /></svg>
                        </div>
                        <div style={{ marginLeft: '15px' }}>
                            <span className='cusinfo-text-small'>{selectedCus?.address}</span>
                        </div>
                    </div>
                    {codAmount && <div style={{ display: 'flex', alignItems: 'center' }}>
                        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_443_3628)">
                                <rect x="2" y="6" width="20" height="12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M22 10C21.4747 10 20.9546 9.89654 20.4693 9.69552C19.984 9.4945 19.543 9.19986 19.1716 8.82843C18.8001 8.45699 18.5055 8.01604 18.3045 7.53073C18.1035 7.04543 18 6.52529 18 6L22 6L22 10Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M18 18C18 16.9391 18.4214 15.9217 19.1716 15.1716C19.9217 14.4214 20.9391 14 22 14L22 18L18 18Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 14C3.06087 14 4.07828 14.4214 4.82843 15.1716C5.57857 15.9217 6 16.9391 6 18L2 18L2 14Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 6C6 7.06087 5.57857 8.07828 4.82843 8.82843C4.07828 9.57857 3.06087 10 2 10L2 6H6Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14.0741 9.5H11.3333C10.597 9.5 10 10.0596 10 10.75C10 11.4404 10.597 12 11.3333 12H13.1111C13.8475 12 14.4444 12.5596 14.4444 13.25C14.4444 13.9404 13.8475 14.5 13.1111 14.5H10" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 9.51733V8.5" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 15.5173V14.5" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                            <defs>
                                <clipPath id="clip0_443_3628">
                                    <rect width="24" height="24" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <div style={{ marginLeft: '20px' }}>
                            <span className='cusinfo-text-small'>{codAmount}</span>
                        </div>
                    </div>}
                    {deliChecked && <div style={{ display: 'flex', alignItems: 'center' }}>
                        <svg width="30px" height="30px" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path strokeWidth={'35px'} d="M252.644 56.915C295.342 38.4482 320.69 113.363 271.651 123.522C231.551 131.832 216.845 78.0154 247.144 58.0544" stroke="#000000" stroke-opacity="0.9" stroke-width="16" strokeLinecap="round" strokeLinejoin="round" />
                            <path strokeWidth={'35px'} d="M330.482 265.712C341.911 277.397 345.967 295.564 330.334 311.241C305.977 335.671 271.834 312.649 271.756 285.037" stroke="#000000" stroke-opacity="0.9" stroke-width="16" strokeLinecap="round" strokeLinejoin="round" />
                            <path strokeWidth={'35px'} d="M192.293 285.199C193.35 293.668 190.602 302.807 182.127 311.229C159.576 333.641 128.721 316.163 123.655 291.812" stroke="#000000" stroke-opacity="0.9" stroke-width="16" strokeLinecap="round" strokeLinejoin="round" />
                            <path strokeWidth={'35px'} d="M231 133C206.612 161.128 194.495 179.606 187 209" stroke="#000000" stroke-opacity="0.9" stroke-width="16" strokeLinecap="round" strokeLinejoin="round" />
                            <path strokeWidth={'35px'} d="M231.268 139C230.078 174.935 230.842 200.382 278 181.706" stroke="#000000" stroke-opacity="0.9" stroke-width="16" strokeLinecap="round" strokeLinejoin="round" />
                            <path strokeWidth={'35px'} d="M270.454 181.27C277.648 203.747 292.95 234.179 296.436 257.918" stroke="#000000" stroke-opacity="0.9" stroke-width="16" strokeLinecap="round" strokeLinejoin="round" />
                            <path strokeWidth={'35px'} d="M198.698 209.851C179.8 211.119 147.038 219.427 133.916 234.11C126.125 242.825 100.697 270.714 108.106 285.446C112.07 293.339 163.502 289.662 170.276 288.7C200.718 284.374 240.691 289.662 270.337 285.446C276.764 284.532 267.42 277.198 275.865 277.198C288.469 277.198 350.064 262.896 339.366 250.123C314.559 220.523 257.393 244.451 266.097 274.746" stroke="#000000" stroke-opacity="0.9" stroke-width="16" strokeLinecap="round" strokeLinejoin="round" />
                            <path strokeWidth={'35px'} d="M200.303 212.449C207.9 229.886 214.057 274.576 214.593 278.703" stroke="#000000" stroke-opacity="0.9" stroke-width="16" strokeLinecap="round" strokeLinejoin="round" />
                            <path strokeWidth={'35px'} d="M200.303 208.553C255.045 208.309 257.332 233.927 223.294 274.806" stroke="#000000" stroke-opacity="0.9" stroke-width="16" strokeLinecap="round" strokeLinejoin="round" />
                            <path strokeWidth={'35px'} d="M169.124 213.748C142.024 230.768 99.6067 221.459 67.7939 231.936" stroke="#000000" stroke-opacity="0.9" stroke-width="16" strokeLinecap="round" strokeLinejoin="round" />
                            <path strokeWidth={'35px'} d="M60 128.007C68.4342 143.576 60 224.334 63.5625 228.038" stroke="#000000" stroke-opacity="0.9" stroke-width="16" strokeLinecap="round" strokeLinejoin="round" />
                            <path strokeWidth={'35px'} d="M63.8965 128.233C105.69 123.275 132.857 122.22 136.014 128.233C139.17 134.247 139.17 171.658 130.567 218.945" stroke="#000000" stroke-opacity="0.9" stroke-width="16" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div style={{ marginLeft: '15px' }}>
                            {<span className='cusinfo-text-small'>Deli ခကောက်ရန် {noDeli && <span>မလို</span>}</span>}
                        </div>
                    </div>}
                    {
                        remark && <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                            <div style={{ width: '30px', alignItems: 'flex-start' }}>
                                <svg fill="#000000" width="25px" height="25px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <title>notice1</title>
                                    <path d="M15.5 3c-7.456 0-13.5 6.044-13.5 13.5s6.044 13.5 13.5 13.5 13.5-6.044 13.5-13.5-6.044-13.5-13.5-13.5zM15.5 27c-5.799 0-10.5-4.701-10.5-10.5s4.701-10.5 10.5-10.5 10.5 4.701 10.5 10.5-4.701 10.5-10.5 10.5zM15.5 10c-0.828 0-1.5 0.671-1.5 1.5v5.062c0 0.828 0.672 1.5 1.5 1.5s1.5-0.672 1.5-1.5v-5.062c0-0.829-0.672-1.5-1.5-1.5zM15.5 20c-0.828 0-1.5 0.672-1.5 1.5s0.672 1.5 1.5 1.5 1.5-0.672 1.5-1.5-0.672-1.5-1.5-1.5z"></path>
                                </svg>
                            </div>
                            <div style={{ marginLeft: '15px' }}>
                                <span className='cusinfo-text-small'>{remark}</span>
                            </div>
                        </div>
                    }
                </div>
            } />

            <div style={{ display: 'flex' }}>
                <input id="hdcb" type="checkbox" checked={headerChecked} onChange={() => setHdcheck(!headerChecked)} />
                <label htmlFor="hdcb" >Show Header</label>
            </div>
            <div style={{ display: 'flex' }}>
                <input id="deli" type="checkbox" checked={deliChecked} onChange={() => setDelicheck(!deliChecked)} />
                <label htmlFor="deli" >delivery charges</label>
            </div>
            <div style={{ display: 'flex' }}>
                <input id="delino" type="checkbox" checked={noDeli} onChange={() => setNoDeli(!noDeli)} />
                <label htmlFor="delino" >no need delivery charges</label>
            </div>
            <input type="text"
                placeholder="COD Amount"
                value={codAmount}
                onChange={(e) => setCodAmount(e.target.value)}
                style={{ marginBottom: '10px' }} />

            <textarea rows={10} placeholder="Remark" value={remark} onChange={(e) => setRemark(e.target.value)} />
            <button style={{ marginTop: '10px' }} onClick={handlePrint}>Print Label</button>
            <button onClick={handleDownloadImage}>Capture Image</button>
        </div>
    )
}

export default CustomerPrintView
