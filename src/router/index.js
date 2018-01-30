/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'

const Home = r => require.ensure([], () => r(require('@/components/HomePage')), 'group-module')
const Login = r => require.ensure([], () => r(require('@/components/Login')), 'group-module')
const Register = r => require.ensure([], () => r(require('@/components/Register')), 'group-module')
const ResetPwd = r => require.ensure([], () => r(require('@/components/ResetPwd')), 'group-module')
const CompleteInfo = r => require.ensure([], () => r(require('@/components/CompleteInfo')), 'group-module')
const EditInfo = r => require.ensure([], () => r(require('@/components/editInfo')), 'group-module')
const EditAvatar = r => require.ensure([], () => r(require('@/components/EditAvatar')), 'group-module')
const SpecialColumnIndex = r => require.ensure([], () => r(require('@/components/homePage/SpecialColumnIndex')), 'group-module')
const SpecialColumnDetails = r => require.ensure([], () => r(require('@/components/homePage/SpecialColumnDetails')), 'group-module')
const Comment = r => require.ensure([], () => r(require('@/components/Comment')), 'group-module')

// 方案
const Programme = r => require.ensure([], () => r(require('@/components/homePage/programme/Programme')), 'programme')
const ProgrammeDetails = r => require.ensure([], () => r(require('@/components/homePage/programme/ProgrammeDetails')), 'programme')
const AdjustmentScheme = r => require.ensure([], () => r(require('@/components/homePage/programme/AdjustmentScheme')), 'programme')
const EditSchemaTemplate = r => require.ensure([], () => r(require('@/components/homePage/programme/EditSchemaTemplate')), 'programme')
const AddSchemaTemplate = r => require.ensure([], () => r(require('@/components/homePage/programme/AddSchemaTemplate')), 'programme')
const SystemProgrammeDetails = r => require.ensure([], () => r(require('@/components/homePage/programme/SystemProgrammeDetails')), 'programme')

// 学堂
const SchoolIndex = r => require.ensure([], () => r(require('@/components/homePage/ThemeSchool/SchoolIndex')), 'ThemeSchool')
const DisscussDetails = r => require.ensure([], () => r(require('@/components/homePage/ThemeSchool/DisscussDetails')), 'ThemeSchool')
const PlayVideo = r => require.ensure([], () => r(require('@/components/homePage/ThemeSchool/PlayVideo')), 'ThemeSchool')
const SchoolClassify = r => require.ensure([], () => r(require('@/components/homePage/ThemeSchool/SchoolClassify')), 'ThemeSchool')
const VideoDisscuss = r => require.ensure([], () => r(require('@/components/homePage/ThemeSchool/VideoDisscuss')), 'ThemeSchool')

// 问答
const AnsweringTheQuestion = r => require.ensure([], () => r(require('@/components/homePage/interlocution/AnsweringTheQuestion')), 'interlocution')
const QandA = r => require.ensure([], () => r(require('@/components/homePage/interlocution/QuestionAndAnswer')), 'interlocution')
const QuestionDetails = r => require.ensure([], () => r(require('@/components/homePage/interlocution/QuestionDetails')), 'interlocution')
const Putquestions = r => require.ensure([], () => r(require('@/components/homePage/interlocution/PutQuestions')), 'interlocution')
const InvitationAnswerList = r => require.ensure([], () => r(require('@/components/homePage/interlocution/InvitationAnswerList')), 'interlocution')
const InvitationSearchResult = r => require.ensure([], () => r(require('@/components/homePage/interlocution/InvitationSearchResult')), 'interlocution')
const AnsweringDetails = r => require.ensure([], () => r(require('@/components/homePage/interlocution/AnsweringDetails')), 'interlocution')

// 工具
const ToolIndex = r => require.ensure([], () => r(require('@/components/homePage/Tool/ToolIndex')), 'Tool')
const CalculateBP = r => require.ensure([], () => r(require('@/components/homePage/Tool/CalculateBP')), 'Tool')
const BodyMassIndex = r => require.ensure([], () => r(require('@/components/homePage/Tool/BMI')), 'Tool')

// 我的模块
const MyPage = r => require.ensure([], () => r(require('@/components/MyPage2')), 'MyPage')
const MyInfo = r => require.ensure([], () => r(require('@/components/MyPage/MyInfo')), 'MyPage')
const MyWallet = r => require.ensure([], () => r(require('@/components/MyPage/MyWallet')), 'MyPage')
const MyCollection = r => require.ensure([], () => r(require('@/components/MyPage/MyCollection')), 'MyPage')
const MyConcern = r => require.ensure([], () => r(require('@/components/MyPage/MyConcern')), 'MyPage')
const BeGoodAt = r => require.ensure([], () => r(require('@/components/MyPage/BeGoodAt')), 'MyPage')
const ModifyPassword = r => require.ensure([], () => r(require('@/components/MyPage/ModifyPassword')), 'MyPage')

const MyDynamic = r => require.ensure([], () => r(require('@/components/MyPage/MyDynamic')), 'MyPage')
const MyAssessment = r => require.ensure([], () => r(require('@/components/MyPage/MyAssessment')), 'MyPage')
const Settings = r => require.ensure([], () => r(require('@/components/MyPage/Settings')), 'MyPage')
const Feedback = r => require.ensure([], () => r(require('@/components/MyPage/Feedback')), 'MyPage')
const VersionUpdate = r => require.ensure([], () => r(require('@/components/MyPage/VersionUpdate')), 'MyPage')
const AssessmentDetails = r => require.ensure([], () => r(require('@/components/MyPage/AssessmentDetails')), 'MyPage')
/* 充值 */
const ReCharge = r => require.ensure([], () => r(require('@/components/MyPage/ReCharge')), 'MyPage')
const WithdrawCash = r => require.ensure([], () => r(require('@/components/MyPage/WithdrawCash')), 'MyPage')

// 康信模块
const MessageIndex = r => require.ensure([], () => r(require('@/components/MessageIndex')), 'MessageList')
const Systemmessage = r => require.ensure([], () => r(require('@/components/Message/SystemMessage')), 'MessageList')
const MessageDialogue = r => require.ensure([], () => r(require('@/components/Message/message')), 'MessageList')
const MessageProgra = r => require.ensure([], () => r(require('@/components/Message/MessageProgramme')), 'MessageList')
const MessageSetting = r => require.ensure([], () => r(require('@/components/Message/messageSetting')), 'MessageList')

// 工作台
const Workbench = r => require.ensure([], () => r(require('@/components/WorkbenchIndex')), 'Workbench')
const PlanList = r => require.ensure([], () => r(require('@/components/Workbench/MyPlanlist')), 'Workbench')
const UserList = r => require.ensure([], () => r(require('@/components/Workbench/UserPatientList')), 'Workbench')
const PlanDetails = r => require.ensure([], () => r(require('@/components/Workbench/PlanDetails')), 'Workbench')
const CommentSuggest = r => require.ensure([], () => r(require('@/components/Workbench/CommentSuggest')), 'MyWorkbench')
const MyAssess = r => require.ensure([], () => r(require('@/components/Workbench/MyAssess')), 'MyWorkbench')
const KnowledgeDetails = r => require.ensure([], () => r(require('@/components/Workbench/KnowledgeDetails')), 'MyWorkbench')
const ViewEvaluation = r => require.ensure([], () => r(require('@/components/Workbench/ViewEvaluation')), 'MyWorkbench')
const UserEvaluation = r => require.ensure([], () => r(require('@/components/Workbench/UserEvaluation')), 'MyWorkbench')
const AnomalyAssessment = r => require.ensure([], () => r(require('@/components/Workbench/AnomalyAssessment')), 'MyWorkbench')
const AddEvaluation = r => require.ensure([], () => r(require('@/components/Workbench/AddEvaluation')), 'MyWorkbench')
const AddAssessmentResult = r => require.ensure([], () => r(require('@/components/Workbench/AddAssessmentResult')), 'MyWorkbench')
const UserPatientList = r => require.ensure([], () => r(require('@/components/Workbench/UserPatientList')), 'MyWorkbench')
const ModifyEvaluation = r => require.ensure([], () => r(require('@/components/Workbench/ModifyEvaluation')), 'MyWorkbench')
const AddEvaluationSecond = r => require.ensure([], () => r(require('@/components/Workbench/AddEvaluationSecond')), 'MyWorkbench')
const ModifyEvaluationSecond = r => require.ensure([], () => r(require('@/components/Workbench/ModifyEvaluationSecond')), 'MyWorkbench')
const EvaluationDetails = r => require.ensure([], () => r(require('@/components/Workbench/EvaluationDetails')), 'MyWorkbench')
const AdjuSchemaTemplate = r => require.ensure([], () => r(require('@/components/Workbench/AdjuSchemaTemplate')), 'MyWorkbench')

// 医生助手
const PersonalInfo = r => require.ensure([], () => r(require('@/components/DoctorAssistant/PersonalInfo')), 'DoctorAssistant')
const EditPersonalInfo = r => require.ensure([], () => r(require('@/components/DoctorAssistant/EditPersonalInfo')), 'DoctorAssistant')

// 搜索
const SearchIndex = r => require.ensure([], () => r(require('@/components/search/SearchIndex')), 'Search')
const SearchResult1 = r => require.ensure([], () => r(require('@/components/search/SearchResult1')), 'search')
const SearchResult2 = r => require.ensure([], () => r(require('@/components/search/SearchResult2')), 'search')

// 绑定账户方式
const BindAlipaySuccess = r => require.ensure([], () => r(require('@/components/myPage/boundAccount/BindAlipaySuccess')), 'boundAccount')
const BindAlipayWrite = r => require.ensure([], () => r(require('@/components/myPage/boundAccount/BindAlipayWrite')), 'boundAccount')
const Binding = r => require.ensure([], () => r(require('@/components/myPage/boundAccount/Binding')), 'boundAccount')
const BindingWechat = r => require.ensure([], () => r(require('@/components/myPage/boundAccount/BindingWechat')), 'boundAccount')
const BindWechatSuccess = r => require.ensure([], () => r(require('@/components/myPage/boundAccount/BindWechatSuccess')), 'boundAccount')

// 使用条款
const TermsOfUse = r => require.ensure([], () => r(require('@/components/myPage/TermsOfUse')), 'TermsOfUse')

// 服务协议
const ServiceAgreement = r => require.ensure([], () => r(require('@/components/myPage/ServiceAgreement')), 'ServiceAgreement')
const address = r => require.ensure([], () => r(require('@/components/common/address')), 'address')

// 审核等待提示
const waitReview = r => require.ensure([], () => r(require('@/components/HintPage/waitReview')), 'HintPage')
const ReviewFailed = r => require.ensure([], () => r(require('@/components/HintPage/ReviewFailed')), 'HintPage')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/address',
      name: 'address',
      component: address
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Comment',
      name: 'Comment',
      component: Comment
    },
    {
      // 知识详情
      path: '/KnowledgeDetails',
      name: 'KnowledgeDetails',
      component: KnowledgeDetails
    },
    {
      // 查看评估
      path: '/ViewEvaluation',
      name: 'ViewEvaluation',
      component: ViewEvaluation
    },
    {
      // 评估问题预览
      path: '/AnomalyAssessment',
      name: 'AnomalyAssessment',
      component: AnomalyAssessment
    },
    {
      // 查看用户评估回答
      path: '/UserEvaluation',
      name: 'UserEvaluation',
      component: UserEvaluation
    },
    {
      // 添加评估
      path: '/AddEvaluation',
      name: 'AddEvaluation',
      component: AddEvaluation
    },
    {
      // 添加评估第二部
      path: '/AddEvaluationSecond',
      name: 'AddEvaluationSecond',
      component: AddEvaluationSecond
    },
    {
      // 修改评估第二部
      path: '/ModifyEvaluationSecond',
      name: 'ModifyEvaluationSecond',
      component: ModifyEvaluationSecond
    },
    {
      // 修改评估
      path: '/ModifyEvaluation',
      name: 'ModifyEvaluation',
      component: ModifyEvaluation
    },
    {
      // 使用患者列表
      path: '/UserPatientList',
      name: 'UserPatientList',
      component: UserPatientList
    },
    {
      // 评估结果
      path: '/AddAssessmentResult',
      name: 'AddAssessmentResult',
      component: AddAssessmentResult
    },
    {
      // 评估详情
      path: '/EvaluationDetails',
      name: 'EvaluationDetails',
      component: EvaluationDetails
    },
    {
      // 调整方案
      path: '/AdjuTemplate:id',
      name: 'AdjuSchemaTemplate',
      component: AdjuSchemaTemplate
    },
    {
      path: '/Workbench',
      name: 'Workbench',
      component: Workbench
    },
    {
      path: '/plandetails:id',
      name: PlanDetails,
      component: PlanDetails
    },
    {
      path: '/planlist',
      name: PlanList,
      component: PlanList
    },
    {
      path: '/PatientList:id',
      name: UserList,
      component: UserList
    },
    {
      path: '/login',
      name: Login,
      component: Login
    },
    {
      path: '/register',
      name: Register,
      component: Register
    },
    {
      path: '/ResetPwd',
      name: ResetPwd,
      component: ResetPwd
    },
    {
      path: '/completeInfo',
      name: CompleteInfo,
      component: CompleteInfo
    },
    {
      path: '/editInfo',
      name: EditInfo,
      component: EditInfo
    },
    {
      path: '/EditAvatar',
      name: EditAvatar,
      component: EditAvatar
    },
    {
      /* 我的主页 */
      path: '/MyPage',
      name: 'MyPage',
      component: MyPage
    },
    {
      /* 我的信息 */
      path: '/MyInfo',
      name: 'MyInfo',
      component: MyInfo
    },
    {
      /* 我的钱包 */
      path: '/MyWallet',
      name: 'MyWallet',
      component: MyWallet
    },
    {
      /* 我的收藏 */
      path: '/MyCollection',
      name: 'MyCollection',
      component: MyCollection
    },
    {
      /* 我的关注 */
      path: '/MyConcern',
      name: 'MyConcern',
      component: MyConcern
    },
    {
      /* 我的动态 */
      path: '/MyDynamic',
      name: 'MyDynamic',
      component: MyDynamic
    },
    {
      /* 我的评价 */
      path: '/MyAssessment',
      name: 'MyAssessment',
      component: MyAssessment
    },
    {
      /* 设置 */
      path: '/Settings',
      name: 'Settings',
      component: Settings
    },
    {
      /* 评价详情 */
      path: '/assessmentDetails',
      name: 'AssessmentDetails',
      component: AssessmentDetails
    },
    {
      /* 意见反馈 */
      path: '/Feedback',
      name: 'Feedback',
      component: Feedback
    },
    {
      /* 版本更新 */
      path: '/VersionUpdate',
      name: 'VersionUpdate',
      component: VersionUpdate
    },
    {
      /* 康信首页 */
      path: '/Message',
      name: 'Message',
      component: MessageIndex
    },
    {
      /* 康信系统消息 */
      path: '/Systemmessage',
      name: 'Systemmessage',
      component: Systemmessage
    },
    {
      /* 康信首页>对话 */
      path: '/dialogue:id',
      name: 'MessageDialogue',
      component: MessageDialogue
    },
    {
      /* 康信首页> 发送方案 */
      path: '/MessagrPrograme',
      name: 'MessagrPrograme',
      component: MessageProgra
    },
    {
      /* 康信首页>对话>对话设置 */
      path: '/MessageSetting:id',
      name: 'MessageSetting',
      component: MessageSetting
    },
    {
      /* 评论结果与建议 */
      path: '/CommentSuggest',
      name: 'CommentSuggest',
      component: CommentSuggest
    },
    {
      path: '/MyAssess',
      name: 'MyAssess',
      component: MyAssess
    },
    {
      /* 个人信息 */
      path: '/PersonalInfo',
      name: 'PersonalInfo',
      component: PersonalInfo
    },
    {
      /* 修改个人信息 */
      path: '/EditPersonalInfo',
      name: 'EditPersonalInfo',
      component: EditPersonalInfo
    },
    {
      /* 方案/评估列表 */
      path: '/Programme',
      name: 'Programme',
      component: Programme
    },
    {
      /* 方案详情 */
      path: '/ProgrammeDetails:id',
      name: 'ProgrammeDetails',
      component: ProgrammeDetails
    },
    {
      /* 系统方案详情 */
      path: '/SystemProgrammeDetails:id',
      name: 'SystemProgrammeDetails',
      component: SystemProgrammeDetails
    },
    {
      /*  调整方案 */
      path: '/AdjustmentScheme',
      name: 'AdjustmentScheme',
      component: AdjustmentScheme
    },
    {
      /*  编辑方案模板 */
      path: '/AddSchemaTemplate',
      name: 'AddSchemaTemplate',
      component: AddSchemaTemplate
    },
    {
      /*  编辑方案模板 */
      path: '/EditSchemaTemplate:id',
      name: 'EditSchemaTemplate',
      component: EditSchemaTemplate
    },
    {
      /* 专栏首页 */
      path: '/SpecialColumnIndex',
      name: 'SpecialColumnIndex',
      component: SpecialColumnIndex
    },
    {
      /* 专栏详情 */
      path: '/Specialcolumndetails',
      name: 'Specialcolumndetails',
      component: SpecialColumnDetails
    },
    {
      /* 学堂主页 */
      path: '/schoolIndex',
      name: 'SchoolIndex',
      component: SchoolIndex
    },
    {
      /* 问答主页 */
      path: '/QandA',
      name: 'QandA',
      component: QandA
    },
    {
      /* 问答问题 */
      path: '/AnsweringTheQuestion',
      name: 'AnsweringTheQuestion',
      component: AnsweringTheQuestion
    },
    {
      /* 提问 */
      path: '/PutQuestions',
      name: 'PutQuestions',
      component: Putquestions
    },
    {
      /* 问题详情 */
      path: '/QuestionDetails',
      name: 'QuestionDetails',
      component: QuestionDetails
    },
    {
      /* 邀请回答列表 */
      path: '/InvitationAnswerList',
      name: 'InvitationAnswerList',
      component: InvitationAnswerList
    },
    {
      /* 回答详情 */
      path: '/AnsweringDetails',
      name: 'AnsweringDetails',
      component: AnsweringDetails
    },
    {
      /* 邀请搜索结果 */
      path: '/InvitationSearchResult',
      name: 'InvitationSearchResult',
      component: InvitationSearchResult
    },
    {
      path: '/DisscussDetails',
      name: 'DisscussDetails',
      component: DisscussDetails
    },
    {
      path: '/PlayVideo/:id',
      name: 'PlayVideo',
      component: PlayVideo
    },
    {
      path: '/SchoolClassify/:id',
      name: 'SchoolClassify',
      component: SchoolClassify
    },
    {
      path: '/VideoDisscuss',
      name: 'VideoDisscuss',
      component: VideoDisscuss
    },
    {
      path: '/ReCharge',
      name: 'ReCharge',
      component: ReCharge
    },
    {
      path: '/BeGoodAt',
      name: 'BeGoodAt',
      component: BeGoodAt
    },
    {
      /* 修改密码 */
      path: '/ModifyPassword',
      name: 'ModifyPassword',
      component: ModifyPassword
    },
    {
      /* 工具首页 */
      path: '/ToolIndex',
      name: 'ToolIndex',
      component: ToolIndex
    },
    {
      /* BMI */
      path: '/BMI',
      name: 'BodyMassIndex',
      component: BodyMassIndex
    },
    {
      /* 血压计算 */
      path: '/CalculateBP',
      name: 'CalculateBP',
      component: CalculateBP
    },
    {
      /* 搜索 */
      path: '/SearchIndex',
      name: 'SearchIndex',
      component: SearchIndex
    },
    {
      /* 展示全部标签的搜索 */
      path: '/SearchResult1',
      name: 'SearchResult1',
      component: SearchResult1
    },
    {
      /* 展示当前选中标签类别的搜索 */
      path: '/SearchResult2',
      name: 'SearchResult2',
      component: SearchResult2
    },
    {
      path: '/WithdrawCash',
      name: 'WithdrawCash',
      component: WithdrawCash
    },
    {
      /* 绑定支付宝成功页面 */
      path: '/BindAlipaySuccess',
      name: 'BindAlipaySuccess',
      component: BindAlipaySuccess
    },
    {
      /* 绑定支付宝输入状态 */
      path: '/BindAlipayWrite',
      name: 'BindAlipayWrite',
      component: BindAlipayWrite
    },
    {
      /* 绑定支付宝或微信（提示信息） */
      path: '/Binding',
      name: 'Binding',
      component: Binding
    },
    {
      path: '/BindingWechat',
      name: 'BindingWechat',
      component: BindingWechat
    },
    {
      path: '/BindWechatSuccess',
      name: 'BindWechatSuccess',
      component: BindWechatSuccess
    },
    {
      // 使用条款
      path: '/TermsOfUse',
      name: 'TermsOfUse',
      component: TermsOfUse
    },
    {
      // 服务协议
      path: '/ServiceAgreement',
      name: 'ServiceAgreement',
      component: ServiceAgreement
    },
    {
      // 请耐心等待审核提示
      path: '/waitReview',
      name: 'waitReview',
      component: waitReview
    },
    {
      // 审核未通过提示
      path: '/ReviewFailed',
      name: 'ReviewFailed',
      component: ReviewFailed
    },
  ]
})
