const { gql } =  require('apollo-server-express');

const schema = gql`

    extend type Query {
        getVerificationSession (id: ID!): VerificationSession
        getVerificationReport (id: ID!): VerificationReport
    }

    extend type Mutation {
        createVerificationSession (user_id: ID!, return_url: String, refresh_url: String): VerificationSession
    }

    # extend type Subscription {
    #     # Your subscription goes here
    # }

    type VDate {
        year: Int
        month: Int
        day: Int
    }

    type VError {
        code: String
        reason: String
    }

    type VerificationConfig {
        document: VerificationConfigDocument
    }

        type VerificationConfigDocument {
            document_types: [String] #Enum: driving_license | passport | id_card
            require_id_number: Boolean
            require_live_capture: Boolean
            require_matching_selfie: Boolean
        }

    type VerificationMetadata {
        user_id: ID
    }

    type VerificationSession {
        id: String
        object: String
        created: String
        last_error: VError #Code->Enum: 
        livemode: Boolean
        metadata: VerificationMetadata,
        options: VerificationConfig
        status: String
        type: String
        url: String
        # verified_outputs: String
        last_verification_report: VerificationReport
    }

    type VerificationReport {
        id: ID
        object: String
        created: Int
        livemode: Boolean
        type: String #Enum: document | id_number
        verification_session: ID #VerificationSession 
        document: VerificationReportDocument 
        options: VerificationConfig
        selfie: VerificationReportSelfie
        metadata: VerificationMetadata
        files: VerificationFiles
    }

        type VerificationReportDocument {
            status: String #Enum: processing | verified | unverified
            error: VError #Code->Enum: document_expired | document_invalid_other | document_type_not_supported | document_type_not_allowed | document_not_readable | document_not_original | document_manipulated
            first_name: String
            last_name: String
            dob: VDate
            address: VerificationDocumentAddress
            document_type: String #Enum: driving_license | passport | id_card
            document_number: String #Expandable --> https://stripe.com/docs/api/expanding_objects
            back: ID #FileUpload,
            front: ID #FileUpload,
            expiration_date: VDate
            issued_date: VDate
            issuing_country: String
        }

        type VerificationDocumentAddress {
            line1: String
            city: String
            state: String
            zip:Int
            country: String
        }

    type VerificationReportSelfie {
        document_front: ID #FileUpload
        error: VError #Code->Enum: selfie_document_non_photo_id | selfie_no_face_detected | selfie_multiple_faces_detected | selfie_face_mismatch | selfie_manipulated
        selfie: ID #FileUpload
        status: String #Enum: processing | verified | unverified
    }
       
    type VerificationFiles {
        document_front: StripeFile
        document_back: StripeFile
        selfie: StripeFile
    }
`;

module.exports = schema;
