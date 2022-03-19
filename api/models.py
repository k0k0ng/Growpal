from django.db import models
from django.contrib.auth.models import User, AbstractBaseUser, BaseUserManager, PermissionsMixin

class Category(models.Model):
    name        = models.CharField(max_length=100)
    updated_at  = models.DateTimeField(auto_now=True)
    created_at  = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Tool(models.Model):
    title       = models.CharField(max_length=200)
    description = models.TextField()
    image       = models.ImageField(blank=True, null=True)
    url         = models.CharField(max_length=200)
    categories  = models.ManyToManyField(Category, blank=True)
    updated_at  = models.DateTimeField(auto_now=True)
    created_at  = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save()

        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user

    # def create_superuser(self, email, password):

    #     if password is None:
    #         raise TypeError('Superusers must have a password.')

    #     user = self.create_user(email, password)
    #     user.is_superuser = True
    #     user.is_staff = True
    #     user.save()

        # return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_full_name(self):
        return self.first_name

    def get_short_name(self):
        return self.first_name
    
    def __str__(self):
        return self.email


# class UserAdditionalAttributes(models.Model):
#     user_ID         = models.OneToOneField(User, on_delete=models.CASCADE)
#     tool_ID         = models.ManyToManyField(Tool, blank=True)
#     profile_image   = models.ImageField(blank=True, null=True)
#     created_at      = models.DateTimeField(auto_now_add=True)