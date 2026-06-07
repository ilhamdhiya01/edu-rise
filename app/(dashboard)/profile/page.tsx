import { Profile } from '@/components/features/profile';

const MyProfilePage = () => {
  return (
    <Profile.Layout>
      <Profile.LayoutItem colSpan={3}>
        <Profile.ImageUpload />
      </Profile.LayoutItem>
      <Profile.LayoutItem colSpan={9}>
        <Profile.UserDataForm />
      </Profile.LayoutItem>
      <Profile.LayoutItem colSpan={6} title="Ubah Password">
        <Profile.UpdatePasswordForm />
      </Profile.LayoutItem>
      <Profile.Section>
        <Profile.LayoutItem colSpan={6} title="Pengaturan pemberitahuan email">
          <Profile.NotificationEmailSetting />
        </Profile.LayoutItem>
        <Profile.LayoutItem
          colSpan={6}
          title="Pengaturan pemberitahuan WhatsApp"
        >
          <Profile.NotificationWhatsappSetting />
        </Profile.LayoutItem>
      </Profile.Section>
    </Profile.Layout>
  );
};

export default MyProfilePage;
