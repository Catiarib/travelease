-- TravelEase Database Schema
-- Version: 1.0
-- Description: Core schema for MICE travel orchestration and EU AI Act compliance

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Organizations & Policies
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    domain VARCHAR(255) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE policies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID REFERENCES organizations(id),
    name VARCHAR(255) NOT NULL,
    rules JSONB NOT NULL, -- Flexible storage for travel rules
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Users & Roles
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID REFERENCES organizations(id),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'traveler', -- 'traveler', 'manager', 'admin'
    preferences JSONB DEFAULT '{}', -- Dietary, seat prefs, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Events & Trips
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID REFERENCES organizations(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'planning', -- 'planning', 'active', 'completed'
    budget_total DECIMAL(12, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id),
    user_id UUID REFERENCES users(id),
    type VARCHAR(50) NOT NULL, -- 'flight', 'hotel', 'train', 'car'
    provider VARCHAR(100), -- 'Amadeus', 'Booking.com', 'Renfe'
    external_id VARCHAR(255), -- PNR or Confirmation number
    details JSONB, -- Seat, room type, flight number
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'confirmed', 'cancelled'
    cost DECIMAL(12, 2),
    currency CHAR(3) DEFAULT 'EUR',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. AI Orchestration & Compliance (EU AI Act)
CREATE TABLE ai_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID REFERENCES organizations(id),
    user_id UUID REFERENCES users(id),
    event_id UUID REFERENCES events(id),
    action_type VARCHAR(100), -- 'context_extraction', 'policy_validation', 'booking_execution'
    input_data JSONB, -- The prompt or input documents (anonymized if needed)
    reasoning_process TEXT, -- Step-by-step logic used by the AI
    output_result JSONB, -- Final decision or output
    compliance_flags JSONB, -- Any warnings or rule violations found
    human_in_loop_approval_by UUID REFERENCES users(id), -- If manual approval was required
    version VARCHAR(20), -- LLM/Engine version
    latency_ms INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Change Management
CREATE TABLE travel_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id),
    alert_type VARCHAR(100), -- 'delay', 'cancellation', 'agenda_change'
    severity VARCHAR(20), -- 'low', 'medium', 'high', 'critical'
    description TEXT,
    resolved_at TIMESTAMP WITH TIME ZONE,
    resolution_details TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_bookings_event ON bookings(event_id);
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_audit_org ON ai_audit_logs(org_id);
CREATE INDEX idx_audit_event ON ai_audit_logs(event_id);
CREATE INDEX idx_alerts_booking ON travel_alerts(booking_id);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_org_modtime BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_booking_modtime BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
