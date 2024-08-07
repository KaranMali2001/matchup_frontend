"use client";
import React from "react";

import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';


export default async function ProfilePage({data}:any) {
 console.log("data reading from profile page component",data)
 
   
    
    
      return (
        <div className="gradient-custom-2 " style={{ backgroundColor: '#9de2ff' }}>
          <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol lg="9" xl="7">
                <MDBCard>
                  <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                    <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                      <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                        alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                      <MDBBtn outline color="dark" style={{height: '36px', overflow: 'visible'}}>
                        Edit profile
                      </MDBBtn>
                    </div>
                    <div className="ms-3" style={{ marginTop: '130px' }}>
                      <MDBTypography tag="h5">{data.first_name} {data.last_name}</MDBTypography>
                      <MDBCardText>@{data.username}</MDBCardText>
                    </div>
                  </div>
                  <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                    <div className="d-flex justify-content-end text-center py-1">
                      <div>
                        <MDBCardText className="mb-1 h5">{data.total_matches}</MDBCardText>
                        <MDBCardText className="small text-muted mb-0">Total Matches</MDBCardText>
                      </div>
                      <div className="px-3">
                        <MDBCardText className="mb-1 h5">{data.win}</MDBCardText>
                        <MDBCardText className="small text-muted mb-0">Win</MDBCardText>
                      </div>
                      <div>
                        <MDBCardText className="mb-1 h5">{data.loss}</MDBCardText>
                        <MDBCardText className="small text-muted mb-0">Loss</MDBCardText>
                      </div>
                    </div>
                  </div>
                  <MDBCardBody className="text-black p-4">
                    <div className="mb-5">
                      <p className="lead fw-normal mb-1">About</p>
                      <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                        <MDBCardText className="font-italic mb-1">{data.email}</MDBCardText>
                        <MDBCardText className="font-italic mb-1">joined since {data.CreatedAt}</MDBCardText>
                        <MDBCardText className="font-italic mb-0">Joined as {data.role}</MDBCardText>
                      </div>
                    </div>
                   
                    
                      
                 
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      );
    }
  

