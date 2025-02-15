export type TCurrentUser = {
  nik: string;
  name: string;
  email: string;
  authorization: Array<{
    id: number;
    employee_code: string;
    employee_name: string;
    is_active: string;
    created_at: string;
    created_by: string;
    technician_level: number;
    active_profile: number;
    active_entities: number;
    is_deleted: boolean;
  }>;
  profile: Array<{
    id: number;
    employee_code: string;
    profile_id: number;
    entities_id: number;
    created_at: any;
    created_by: any;
    mst_profile: {
      id: number;
      profile_name: string;
      is_deleted: boolean;
      created_at: any;
      created_by: any;
    };
  }>;
  group: Array<any>;
  employment: {
    id: number;
    deparment_id: number;
    grade_id: number;
    is_active: number;
    is_presdir: number;
    is_bod: number;
    is_depthead: number;
    created_at: string;
    created_by: string;
    master_ou_code: number;
    employee_code: string;
    employee_name: string;
    address_line_1: string;
    address_line_2: string;
    mail_id: string;
    employment_ou: number;
    employment_ou_desc: string;
    supervisor: string;
    supervisor_name: string;
    position_code: string;
    position_desc: string;
    job_grade_code: string;
    job_grade_desc: string;
    org_locn_work_code: string;
    org_locn_work_desc: string;
    profile_pic: any;
    department_code: string;
    department_desc: string;
    date_of_birth: string;
    date_of_join: string;
    job_classification: string;
    position_start_date: string;
    position_end_date: string;
    phone_number: string;
  };
  department: number;
  department_name: string;
  active_profile: string;
  active_entities: string;
  role: string;
};

export interface TMstProjectState {
  id: number;
  status: string;
  created_at: string;
  created_by: string;
}

export interface ITrProject {
  id: number;
  request_id: number;
  expected_completion: string;
  application_id: any;
  project_code: string;
  project_name: string;
  background: string;
  issue_description: string;
  business_impact: string;
  group_id: number;
  plan_start_date: string;
  plan_end_date: string;
  real_start_date: any;
  real_end_date: any;
  percent_done: any;
  auto_percent_done: any;
  state: number;
  type: string;
  cost?: any;
  is_deleted: string;
  created_at: string;
  created_by: string;
  mst_group: IMstGroup;
  mst_project_state: IMstProjectState;
}

export interface IMstGroup {
  id: number;
  entities_id: number;
  group_name: string;
  parent_id: number;
  is_deleted: boolean;
  created_at: string;
  created_by: any;
}

export interface IMstProjectState {
  id: number;
  status: string;
  created_at: string;
  created_by: string;
}

export interface IMstApplication {
  id: number;
  application_name: string;
  group_id_technician: string;
  entity_id: number;
  department_code: string;
  is_deleted: boolean;
  created_at: string;
  created_by?: any;
}

export interface ITrDocument {
  id: number;
  type: string;
  type_id: number;
  name: string;
  filename: string;
  filepath: string;
  filesize: number;
  mime: string;
  is_deleted: string;
  created_at: string;
  created_by?: any;
}

export interface IMstCategory {
  id: number;
  category_code: string;
  category_name: string;
  is_active: string;
  created_at?: any;
  created_by?: any;
}

export interface IMstApplication {
  id: number;
  application_name: string;
  group_id_technician: string;
  entity_id: number;
  department_code: string;
  is_deleted: boolean;
  created_at: string;
  created_by?: any;
}

export interface ITrRequest {
  id: number;
  entities_id?: any;
  application_id: number;
  category: number;
  ticket_name: string;
  creation_date: string;
  closed_date?: any;
  creator: string;
  status: string;
  urgency: string;
  expected_completion_date: string;
  type: string;
  department_code: string;
  department_name: string;
  is_project?: any;
  background: string;
  issue_description: string;
  business_impact?: string;
  created_at: string;
  created_by: string;
  impact?: any;
  priority?: any;
  background_what: string;
  background_who: string;
  background_when: string;
  background_where: string;
  background_why: string;
  background_how: string;
  mst_category: IMstCategory;
  mst_application: IMstApplication;
}

export interface IMstProjectFlow {
  id: number;
  flow: string;
  desc: string;
  pic: string;
  action?: any;
  icon: string;
  created_at: string;
  created_by: string;
}

export interface ITrProjectFlow {
  id: number;
  project_id: number;
  flow_id: number;
  updated_at: string;
  updated_by: string;
  state: 'Pending' | 'Done' | 'Progress';
  mst_project_flow: IMstProjectFlow;
  tr_project_activity: any[];
}

export type TProjectSummary = {
  submitDate: string;
  expectedCompletion: string;
  type: string;
  projectState: {
    id: number;
    status: string;
    created_at: string;
    created_by: string;
  };
  totalCostPlanning: string;
  totalCostActual: string;
  totalManHoursPlanning: number;
  totalManHourActual: number;
  percentDone: number;
  projectTeam: Array<{
    id: number;
    project_id: number;
    employee_code: string;
    is_deleted: boolean;
    created_at: string;
    created_by: string;
  }>;
};

export interface TrProjectTask {
  id: number;
  project_id: number;
  task_name: string;
  content: any;
  plan_start_date: string;
  plan_end_date: string;
  real_start_date?: string;
  real_end_date?: string;
  plan_duration: number;
  real_duration?: number;
  percent_done: number;
  auto_calculated: any;
  cost: number;
  task_type: string;
  created_at?: string;
  created_by: any;
  task_category?: string;
  is_deleted: boolean;
  parent_id?: number;
  pic: string;
  status: string;
  tr_project_task?: {
    task_name: string;
    id: number;
  };
  tr_project: {
    project_name: string;
  };
  mst_authorization: {
    employee_code: string;
    employee_name: string;
  };
}

export interface MstSatisfactionQuestion {
  id: number;
  target: string;
  rating_type: string;
  rating_scale: number;
  rating_question: string;
  deleted: boolean;
  created_at: string;
  created_by: string;
}

export interface ITechnicianData {
  id: number;
  request_id: number;
  employee_code: string;
  is_deleted: number;
  created_at: string;
  created_by?: any;
  employee_name: string;
  profile_pic: string;
}

export interface ITrSatisfactionRating {
  id: number;
  satisfaction_id: number;
  rating_type: string;
  rating_scale: number;
  rating_value: number;
  rating_score: number;
  rating_question: string;
  rating_comment: string;
  deleted: boolean;
  created_by: string;
  created_at: string;
}

export interface ITrSatisfaction {
  id: number;
  target: string;
  project_id: number;
  request_id: number;
  developer_employee_code?: any;
  overall_comment: string;
  created_at: string;
  created_by: string;
  deleted: boolean;
  project: ITrProject;
  ratings: ITrSatisfactionRating[];
  request: ITrRequest;
}

export interface ResponseSatisfactionSurvey {
  status: boolean;
  data: ITrSatisfaction[];
}

export interface MstEntities {
  id: number;
  entities_name: string;
  parent_id: any;
  created_at: any;
  created_by: any;
}

export interface MstProfile {
  id: number;
  profile_name: string;
  is_deleted: boolean;
  created_at: any;
  created_by: any;
}

export interface MstAuthorizationProfile {
  id: number;
  employee_code: string;
  profile_id: number;
  entities_id: number;
  created_at: any;
  created_by: any;
  mst_profile: MstProfile;
}

interface UserGroup {
  id: number;
  employee_code: string;
  group_id: number;
  is_manager: string;
  created_at: any;
  created_by: any;
  mst_group: IMstGroup;
}

export interface IMasterAuthorization {
  id: number;
  employee_code: string;
  employee_name: string;
  technician_level: number;
  mst_entities: MstEntities;
  mst_profile: MstProfile;
  mst_manpower_cost: {
    hourly: number;
  };
  authorization_profile: Array<MstAuthorizationProfile>;
  authorization_group: Array<UserGroup>;
}
