
const roadmapData = [
  {
    stage: 1,
    title: 'Giai đoạn 1: Nền tảng (0-300+)',
    description: 'Xây dựng lại toàn bộ kiến thức ngữ pháp và từ vựng cơ bản bị mất gốc. Đây là bước quan trọng nhất để làm chủ các giai đoạn sau.',
    status: 'completed',
    buttonText: 'Ôn tập lại',
  },
  {
    stage: 2,
    title: 'Giai đoạn 2: Bứt phá (300-500+)',
    description: 'Tập trung luyện sâu vào các dạng bài thường gặp trong Part 1, 2, 5. Bắt đầu làm quen với Part 3 và Part 7 ở mức độ dễ.',
    status: 'in_progress',
    buttonText: 'Tiếp tục học',
  },
  {
    stage: 3,
    title: 'Giai đoạn 3: Tăng tốc (500-750+)',
    description: 'Chiến thuật làm bài cho các Part khó như 3, 4, 6, 7. Luyện tập với các bộ đề có độ khó tương đương thi thật.',
    status: 'locked',
    buttonText: 'Bắt đầu',
  },
  {
    stage: 4,
    title: 'Giai đoạn 4: Về đích (750-990)',
    description: 'Giải các bộ đề khó nhất, luyện kỹ năng quản lý thời gian và tâm lý phòng thi. Phân tích lỗi sai và lấp đầy lỗ hổng kiến thức.',
    status: 'locked',
    buttonText: 'Bắt đầu',
  },
];

const LoTrinhPage = () => {
  const completedStages = roadmapData.filter(s => s.status === 'completed').length;
  const progressPercentage = (completedStages / roadmapData.length) * 100;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">Đã hoàn thành</span>;
      case 'in_progress':
        return <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">Đang học</span>;
      case 'locked':
        return <span className="bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1 rounded-full">Chưa mở</span>;
      default:
        return null;
    }
  };
  
  const getButtonClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50';
      case 'in_progress':
        return 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/50';
      case 'locked':
        return 'bg-slate-200 text-slate-500 cursor-not-allowed';
      default:
        return '';
    }
  };

  return (
    <main className="container mx-auto max-w-4xl md:pt-32 p-4 md:p-6">
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-3">Lộ Trình Học TOEIC Của Bạn</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Lộ trình được cá nhân hóa dựa trên trình độ và mục tiêu của bạn. Hãy hoàn thành từng bước để đạt được số điểm mong muốn.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-lg font-bold mb-2">Tiến độ tổng quan</h2>
        <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden mb-1">
          <div 
            className="bg-indigo-600 h-full rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-500" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="text-sm font-bold text-indigo-600">{Math.round(progressPercentage)}% Hoàn thành</p>
      </section>
      
      <section className="relative space-y-8">
        {/* Vertical line */}
        <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-200"></div>

        {roadmapData.map((stage) => (
          <div key={stage.stage} className="relative pl-16">
            <div className="absolute left-0 top-1.5 flex items-center justify-center w-12 h-12 bg-white border-4 border-slate-200 rounded-full text-lg font-bold text-slate-400">
              {stage.status === 'completed' ? <i className="fas fa-check text-green-500"></i> : stage.stage}
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{stage.title}</h3>
                {getStatusBadge(stage.status)}
              </div>
              <p className="text-slate-600 mb-6">{stage.description}</p>
              <button 
                disabled={stage.status === 'locked'} 
                className={`px-6 py-2.5 rounded-xl font-bold transition-all ${getButtonClass(stage.status)}`}
              >
                {stage.buttonText}
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default LoTrinhPage;
