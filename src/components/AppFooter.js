// import React from 'react'
// import { CFooter } from '@coreui/react'

// const AppFooter = () => {
//   return (
//     <CFooter className="px-4">
//       <div>
//         <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
//           CoreUI
//         </a>
//         <span className="ms-1">&copy; 2024 creativeLabs.</span>
//       </div>
//       <div className="ms-auto">
//         <span className="me-1">Powered by</span>
//         <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
//           CoreUI React Admin &amp; Dashboard Template
//         </a>
//       </div>
//     </CFooter>
//   )
// }

// export default React.memo(AppFooter)

// import React from 'react'
// import { CFooter } from '@coreui/react'

// // Đọc version từ package.json
// const version = process.env.REACT_APP_VERSION || require('../../package.json').version

// const AppFooter = () => {
//   return (
//     <CFooter className="px-4 text-center">
//       <span>Version {version}</span>
//     </CFooter>
//   )
// }

// export default React.memo(AppFooter)

// import React from "react";
// import { CFooter, CContainer, CRow, CCol } from "@coreui/react";

// // Đọc version từ package.json
// const version =
//   process.env.REACT_APP_VERSION || require("../../package.json").version;

// const AppFooter = () => {
//   return (
//     <CFooter className="px-4 py-3 text-center bg-light border-top">
//       <CContainer>
//         <CRow className="align-items-center">
//           <CCol md={6} className="text-md-start mb-2 mb-md-0">
//             <span>© 2025 Công ty Đại Hoàng Gia. All rights reserved.</span>
//             <br />
//             <span>Địa chỉ: 123 Đường ABC, Quận X, TP.HCM</span>
//             <br />
//             <span>
//               Email: support@daihhoanggia.vn | Điện thoại: (028) 1234 5678
//             </span>
//           </CCol>
//           <CCol md={6} className="text-md-end">
//             <span>Version {version}</span>
//           </CCol>
//         </CRow>
//       </CContainer>
//     </CFooter>
//   );
// };

// export default React.memo(AppFooter);

import React from "react";
import { CFooter, CContainer, CRow, CCol } from "@coreui/react";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";

// Đọc version từ package.json
const version =
  process.env.REACT_APP_VERSION || require("../../package.json").version;

const AppFooter = () => {
  return (
    <CFooter
      className="bg-dark text-light py-3"
      style={{ borderTop: "1px solid #444" }}
    >
      <CContainer>
        <CRow className="align-items-center">
          {/* Thông tin công ty */}
          <CCol md={6} className="text-center text-md-start mb-2 mb-md-0">
            <div style={{ fontSize: "0.875rem", lineHeight: "1.5" }}>
              © 2025 Công ty Đại Hoàng Gia. All rights reserved.
            </div>
            <div style={{ fontSize: "0.875rem" }}>
              Địa chỉ: 2F, HALO Building, 677/7 Điện Biên Phủ, Phường Thạnh Mỹ
              Tây, Tp.Hồ Chí Minh
            </div>
            <div style={{ fontSize: "0.875rem" }}>
              Email: to.nam@toshibtec.com.vn | Điện thoại: 1800 588810 Phím 0
            </div>
          </CCol>

          {/* Phiên bản & mạng xã hội */}
          <CCol md={6} className="text-center text-md-end">
            <div style={{ fontSize: "0.875rem", marginBottom: "0.25rem" }}>
              Version {version}
            </div>
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={18} color="#ffffff" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={18} color="#ffffff" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={18} color="#ffffff" />
              </a>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </CFooter>
  );
};

export default React.memo(AppFooter);
