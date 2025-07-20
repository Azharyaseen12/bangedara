# Generated manually for PDFBook model

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_blog_language'),
    ]

    operations = [
        migrations.CreateModel(
            name='PDFBook',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('pdf', models.FileField(upload_to='pdf_books/')),
                ('thumbnail', models.ImageField(blank=True, null=True, upload_to='pdf_thumbnails/')),
                ('uploaded_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ] 