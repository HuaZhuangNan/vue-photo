<template>
<section class="disabled-container">
<el-row class="count-container">
<el-col v-for="(item, index) in counts"
  :key="index"
  :xs="24" :sm="24 / counts.length">
  <el-card shadow="hover" class="count-item">
    <h3>{{item.name}}<span>{{item.count}}</span></h3>
  </el-card>
</el-col>
</el-row>
<el-row>
  <el-col :xs="24" :sm="12" class="count-item">
    <el-card class="box-card statistics-container" shadow="hover">
      <div slot="header" class="clearfix">
        <h3>登录历史</h3>
      </div>
      <div class="statistics-item"><span>127.0.0.1</span> <span>2020年5月11日20:57:45</span></div>
      <div class="statistics-item"><span>127.0.0.1</span> <span>2020年5月11日20:57:45</span></div>
      <div class="statistics-item"><span>127.0.0.1</span> <span>2020年5月11日20:57:45</span></div>
    </el-card>
  </el-col>
  <el-col :xs="24" :sm="12">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <h3>图片访问统计</h3>
      </div>
    </el-card>
  </el-col>
</el-row>
<el-row v-if="appStatisic">
  <el-col :xs="24" :sm="12" class="count-item">
    <el-card class="box-card statistics-container" shadow="hover">
      <div slot="header" class="clearfix">
        <h3>{{appStatisic.img_count}}</h3>
      </div>
      <div class="statistics-item"><span>127.0.0.1</span> <span>2020年5月11日20:57:45</span></div>
      <div class="statistics-item"><span>127.0.0.1</span> <span>2020年5月11日20:57:45</span></div>
      <div class="statistics-item"><span>127.0.0.1</span> <span>2020年5月11日20:57:45</span></div>
    </el-card>
  </el-col>
  <el-col :xs="24" :sm="12">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <h3>图片访问统计</h3>
      </div>
    </el-card>
  </el-col>
</el-row>
</section>
</template>

<script>
import { GetStatistic } from '@/api/app';

export default {
  name: 'Dashboard',
  computed: {
    appStatisic() {
      const data = GetStatistic()
        .then(res => res.data);
      console.log(data);
      return data;
    },
  },
  data() {
    return {
      counts: [
        {
          name: '登录次数',
          count: this.$store.getters.login_count,
        },
        {
          name: '图片总数',
          count: this.$store.getters.img_count,
        },
        {
          name: '图片访问总数',
          count: this.$store.getters.visit_count,
        },
      ],
      statisic: [
        {
          name: '图片访问统计',
          arr: this.$store.getters.img_visit_counts,
        },
        {
          name: '登录ip统计',
          arr: this.$store.getters.ips,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/scss/var.scss';

.disabled-container {
  height: 1800px;
  width: 100%;
  .f-left {
    float: left;
  }
  .f-right {
    float: right;
  }
  .el-row {
    box-sizing: border-box;
    margin: 0;
  }
  .el-col {
    padding:0 10px;
    margin-bottom: 0.2rem;
    .el-card {
      min-height: 0.6rem;
    }
  }
  .count-container {
    line-height: 0.6rem;
    text-align: center;
    .count-item h3 span {
      padding-left: 0.2rem;
      color: map-get($colors, 'primary');
    }
  }
  .statistics-container {
    padding: 5px 0;
  }
  .statistics-item {
    line-height: 0.3rem;
    & :nth-child(2){
      float: right;
    }
  }
}
</style>
