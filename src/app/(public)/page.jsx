import AdvancedLearning from "@/components/modules/home/AdvancedLearning";
import FeaturedCourses from "@/components/modules/home/FeaturedCourses";
import HeroSection from "@/components/modules/home/HeroSection";
import LearningJourney from "@/components/modules/home/LearningJourney";
import MembershipSection from "@/components/modules/home/MembershipSection";
import OurBenefits from "@/components/modules/home/OurBenefits";
import PartnerBrands from "@/components/modules/home/PartnerBrands";
import StudentSuccess from "@/components/modules/home/StudentSuccess";
import TopCategories from "@/components/modules/home/TopCategories";
import TrustedPartners from "@/components/modules/home/TrustedPartners";


export default function HomePage() {
    return (
        <div>
            <HeroSection />
            <TopCategories />
            <FeaturedCourses />
            <OurBenefits />
            <MembershipSection />
            <TrustedPartners />
            <AdvancedLearning />
            <LearningJourney />
            <PartnerBrands />
            <StudentSuccess />
        </div>
    );
}